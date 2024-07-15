
import validator from "validator";
import {
    assertText,
    assertSelect,
} from "@/helper/types/helper.type";

export function validateRequirement(
    key: keyof RegisterConfig,
    registerObj: RegisterConfig,
): string[] {
    const item = registerObj[key];

    //check if the item has a requiredProp and it's value is validated
    if (item.requirement !== undefined && item.requirement.length > 0) {
        return item.requirement.filter((key) => {
            const requiredItem = registerObj[key as keyof RegisterConfig];
            if ((requiredItem as TextInput).validatorApi.badgeStatus !== "Pass") {
                return key;
            }
        });
    }
    return [];
}

export function validateType(
    input: string,
    key: keyof RegisterConfig,
    registerObj: RegisterConfig,
): boolean {
    const item = registerObj[key];
    if (!assertText(item)) return true;
    if (!("type" in item.input)) return true;

    if (item.input.type === "regex") {
        try {
            new RegExp(input);
            return true;
        } catch (_) {
            return false;
        }
    }

    if (item.input.type === "url") {
        return validator.isURL(input);
    }

    if (item.input.type === "string") {
        return validator.isAscii(input);
    }

    return true;
}

export function renderBadgeClass(status: string): string {
    return `badge badge-outline ${status === "Pass"
        ? "badge-success"
        : status === "Error"
            ? "badge-error"
            : "badge-warning"
        }`;
}

export function renderTextInputColor(
    key: keyof RegisterConfig,
    register: RegisterConfig,
): string {
    const item = register[key];
    if (!assertText(item)) return "";
    if (validateRequirement(key, register).length > 0) return "input-error";
    if (item.input.typeCheckResult === false) return "input-error";

    if (item.validatorApi.badgeStatus === "Pass") return "input-success";
    return "";
}

export function renderTextInputBottomText(
    key: keyof RegisterConfig,
    register: RegisterConfig,
): string {
    const item = register[key];
    if (!assertText(item)) return "";

    const requirementValResult = validateRequirement(key, register);
    if (requirementValResult.length > 0) {
        return `${requirementValResult.join(",")} is empty.  Please provide ${requirementValResult.join(",")} first. `;
    }

    if (item.input.typeCheckResult === false) {
        return `Input value must be of type ${item.input.type}.`;
    }

    return "";
}

export function textInputOnChange(
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof RegisterConfig,
    register: RegisterConfig,
    setRegister: (register: RegisterConfig) => void,
): void {
    const item = register[key];
    if (!assertText(item)) return;
    if (e.target.value === "") return;

    setRegister({
        ...register,
        [key]: {
            ...item,
            input: {
                ...item.input,
                typeCheckResult: validateType(e.target.value, key, register),
            },
        },
    });
}

export const validateValue = async (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof RegisterConfig,
    register: RegisterConfig,
    setRegister: (register: RegisterConfig) => void,
): Promise<void> => {
    if (e.target.value === "") return;
    const item = register[key];
    if (!assertText(item)) return;

    //clear errorMsg and extracted before fetching
    setRegister({
        ...register,
        [key]: {
            ...item,
            validatorApi: { ...item.validatorApi, errorMsg: null, extracted: "" },
        },
    });

    try {
        const res = await fetch(
            `http://localhost:3333/validator${item.validatorApi.apiEndPoint}`,
            {
                method: "POST",
                body: JSON.stringify({ key: key, input: e.target.value }),
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            },
        );
        const data = await res.json();
        if (data.pass) {
            setRegister({
                ...register,
                [key]: {
                    ...item,
                    value: e.target.value,
                    validatorApi: {
                        ...item.validatorApi,
                        badgeStatus: "Pass",
                        extracted: data.result,
                    },
                },
            });
            return;
        }

        if (!data.pass) {
            setRegister({
                ...register,
                [key]: {
                    ...item,
                    validatorApi: {
                        ...item.validatorApi,
                        badgeStatus: "Error",
                        errorMsg: data.errMsg,
                    },
                },
            });
        }
    } catch (error) { }
};


export function isRegistable(register: RegisterConfig): boolean {
    for (const [key, item] of Object.entries(register)) {
        if (item.dependency !== undefined) {
            if (
                register[item.dependency.key as keyof RegisterConfig].value !==
                item.dependency.value
            ) {
                console.log(`skipped ${key} due to ${item.dependency.key} not being selected.`);
                continue;
            }
        }

        if (assertText(item)) {
            if (item.validatorApi.badgeStatus !== "Pass") {
                console.log(`false due to ${key} badge state is ${item.validatorApi.badgeStatus}`);
                return false;
            }
        }

        if (assertSelect(item) && item.value === null) {
            console.log(`false due to ${key} value is ${item.value}`);
            return false;
        }
    }
    console.log("fulfilled all requirement.  display the button");
    return true;
}

export async function registerScraper(register: RegisterConfig): Promise<void> {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const values = Object.entries(register).reduce((acc: { [key in keyof RegisterConfig]: any }, [key, item]) => {
        acc[key as keyof RegisterConfig] = item.value;
        return acc;
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    }, {} as { [key in keyof RegisterConfig]: any });
    try {
        const res = await fetch("http://localhost:3333/register/single", {
            method: "POST",
            body: JSON.stringify({ ...values }),
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        const data = await res.json();
        console.log(data.message);
    } catch (error) {
        console.error(error);
    }
}
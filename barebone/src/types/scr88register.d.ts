
// type ValueTypes = "value" | "badgeStatus" | "errorMsg";

type BadgeStatus = "Pending Input" | "Pass" | "Error";

type BaseInput = {
    label: string;
    value: string | boolean | null;
    requirement?: string[];
    dependency?: {
        key: RegisterKeys;
        value: string | null | boolean;
    };
}
type TextInputTypes = "string" | "url" | "regex";
type TextInput = {
    input: {
        method: "text";
        placeholder: string;
        defaultValue?: string;
        type: TextInputTypes;
        typeCheckResult: boolean | null;
    };
    validatorApi: {
        apiEndPoint: string | null;
        badgeStatus: BadgeStatus;
        extracted: string | null;
        errorMsg: string | null;
    }
};

type ToggleInput = {
    input: {
        method: "toggle";
        defaultChecked: boolean;
    };
};

type SelectInput = {
    input: {
        method: "select";
        defaultValue?: string;
        choices: string[];
    };
};


type RegisterConfig = {
    name: BaseInput & TextInput;
    category: BaseInput & SelectInput;
    rootUrl: BaseInput & TextInput;
    entryUrl: BaseInput & TextInput;
    language: BaseInput & SelectInput;
    siteType: BaseInput & SelectInput;
    links: BaseInput & TextInput;
    multiple: BaseInput & TextInput;
    nextPageType: BaseInput & SelectInput;
    last: BaseInput & TextInput;
    lastPageNumberRegExp: BaseInput & TextInput;
    parameter: BaseInput & TextInput;
    url: BaseInput & TextInput;
    next: BaseInput & TextInput;
    tagFiltering: BaseInput & ToggleInput;
    tags: BaseInput & TextInput;
    tagCollect: BaseInput & ToggleInput;
    articleTagSelector: BaseInput & TextInput;
    articleTitleSelector: BaseInput & TextInput;
    articleBodySelector: BaseInput & TextInput;
    frequency: BaseInput & SelectInput;
}

type RegisterKeys = keyof RegisterConfig;

// interface SubObject {
//     label: string;
//     input: {
//         method: string;
//         defaultValue: null | string | boolean;
//         choices?: string[] | boolean[];
//     };
//     value: string | boolean | null;
//     badgeStatus?: string | null;
//     errorMsg?: string | null;
//     preValidation?: string[] | null;
//     apiEndPoint?: string | null;
//     extracted?: string | null;
//     child?: {
//         [key: string]: SubObject;
//     };
// }

// interface RegisterObj {
//     [key: string]: SubObject;
// }

// type updateValues = {
//     value?: string | boolean;
//     badgeStatus?: string;
//     errorMsg?: string;
// }[];

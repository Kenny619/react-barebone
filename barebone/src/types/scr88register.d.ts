
// type ValueTypes = "value" | "badgeStatus" | "errorMsg";

type BaseInput = {
    label: string;
    value: string | boolean | null;
    preValidation?: string[] | null;
}

type TextInput = {
    input: {
        method: "text";
        placeholder: string;
        defaultValue?: string;
    };
    validatorApi: {
        apiEndPoint: string | null;
        badgeStatus: string | null;
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

type SiteTypeChild = {
    child: {
        links: BaseInput & TextInput;
        multiple: BaseInput & TextInput;
    }
}

type NextPageTypeChild = {
    child: {
        last: BaseInput & TextInput & {
            child: {
                lastPageNumberRegExp: BaseInput & TextInput;
            }
        };
        parameter: BaseInput & TextInput;
        url: BaseInput & TextInput;
        next: BaseInput & TextInput;
    },
}

type TagFilteringChild = {
    child: {
        tags: BaseInput & TextInput;
    }
}

type TagCollectChild = {
    child: {
        articleTagSelector: BaseInput & TextInput;
    }
}

type RegisterConfig = {
    name: BaseInput & TextInput;
    rootUrl: BaseInput & TextInput;
    entryUrl: BaseInput & TextInput;
    language: BaseInput & SelectInput;
    siteType: BaseInput & SelectInput & SiteTypeChild;
    nextPageType: BaseInput & SelectInput & NextPageTypeChild;
    tagFiltering: BaseInput & ToggleInput & TagFilteringChild;
    tagCollect: BaseInput & ToggleInput & TagCollectChild;
    articleTitleSelector: BaseInput & TextInput;
    articleBodySelector: BaseInput & TextInput;
    frequency: BaseInput & SelectInput;
}

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

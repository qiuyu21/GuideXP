import React from "react";
import { Select } from "antd";
import LANGUAGES from "../../../helper/languageHelper";
const { Option } = Select;

export default function LanguageSelect() {
    const languages = [];
    const keys = Object.keys(LANGUAGES);
    for (const key of keys) {
        languages.push(<Option key={LANGUAGES[key].code}>{LANGUAGES[key].language}</Option>)
    }
    return (
        <Select
            mode="multiple"
            showSearch={false}
            showArrow={true}
            placeholder="Add Supportive Languages"
        >
            {languages}
        </Select >
    )
}
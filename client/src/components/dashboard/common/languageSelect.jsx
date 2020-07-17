import React, { useState } from "react";
import { Select } from "antd";
import { LANGUAGES } from "../../../helper/languageHelper";
const { Option } = Select;

export default function LanguageSelect(props) {
    let { defaultValues } = props;
    // if (!defaultValues) defaultValues = [];
    // const [values, setValues] = useState(defaultValues);
    const languages = [];
    const keys = Object.keys(LANGUAGES);
    for (const key of keys) {
        languages.push(<Option key={LANGUAGES[key].code}>{LANGUAGES[key].language}</Option>)
    }

    // const onSelect = (lan) => {
    //     const newvalues = [...values];
    //     newvalues.push(lan);
    //     setValues(newvalues);
    // }

    // const onDeSelect = (lan) => {
    //     const newvalues = [...values];
    //     const filteredarray = newvalues.filter(e => e !== lan);
    //     setValues(filteredarray);
    // }

    return (

        <Select
            mode="multiple"
            showSearch={false}
            showArrow={true}
            placeholder="Add Supportive Languages"
            // value={values}
            // onSelect={onSelect}
            // onDeselect={onDeSelect}
            defaultValue={defaultValues}
        >
            {languages}
        </Select >
    )
}
import React from 'react';

const Label = ({
    label
}) => {
    return (
        <span className="label label-warning">{label}</span>
    )
}

const Labels = ({
    labels
}) => {
    const labelItems = labels.map((label, i) => {
        return (
            <Label key={i} label={label} />
        )
    })

    return labelItems
}

export default Labels
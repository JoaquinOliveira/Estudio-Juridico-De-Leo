// VenceField.jsx
import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

const VenceField = ({ value, onChange }) => {
    const parsedValue = value ? dayjs(value, "DD [de] MMMM [de] YYYY") : null;
    return (
        <DatePicker
            value={parsedValue}
            onChange={(date) => onChange(date ? date.format("DD [de] MMMM [de] YYYY") : '')}
            format="DD [de] MMMM [de] YYYY"
            style={{ width: '100%' }}
        />
    );
};

export default VenceField;

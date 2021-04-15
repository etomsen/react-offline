import React from 'react';
import { AgnosticSelect, TextSelectItem } from './AngnosticSelect';

function Common() {
    const onChange = (index: number) => {
        alert(`${index} is selected`);
    }
    return (<div>
        <AgnosticSelect onChange={onChange}>
            <TextSelectItem text={'First'}></TextSelectItem>
            <TextSelectItem text={'Second'}></TextSelectItem>
        </AgnosticSelect>
    </div>);
}

export default Common;
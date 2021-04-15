import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { Subtract } from 'utility-types';

const useStyles = makeStyles(() => createStyles({
    itemClass: {
        color: (selected) => selected ? 'red' : 'blue',
    }
}));

interface ItemCtx<T> {
    context: T;
    selected?: boolean;
    onClick?: (context: T) => void;
}

function withSelectItem<T extends ItemCtx<any>>(Component: React.FC<T>) {
    return class SelectItem extends React.Component<Subtract<T, ItemCtx<any>>, {}> {
      render() {
        return (
          <Component {...this.props as T}/>
        );
      }
    };
}

interface TextSelectItemProps extends ItemCtx<{id: number}> {
    text: string;
}

export const TextSelectItem = withSelectItem((props: TextSelectItemProps) => {
    const {itemClass} = useStyles(props.selected);
    const onClick = () => {
        if (props.onClick) {
            props.onClick(props.context)
        }
    };
    return (<div className={itemClass} onClick={onClick}>
        {props.text}
    </div> )
});


interface SelectProps {
    onChange: (selectedIndex: number) => void;
}

export const AgnosticSelect: React.FC<SelectProps> = ({children, onChange}) => {
    const [selected, setSelected] = React.useState<number>(-1);
    const items = React.Children.toArray(children);
    
    const createHandleClick = (index: number) => () => {
        setSelected(index);
        onChange(index);
    };

    const options = items.map((i, index) => {
        if (
            React.isValidElement(i) &&
            typeof(i.type === 'function') &&
            (i.type as any)['name'] === 'SelectItem'
        ) {
            return React.cloneElement(i, { 
                key: index,
                onClick: createHandleClick(index),
                selected: index === selected
            });
        } else {
            return null;
        }
    }).filter(Boolean);
    
    return (<div>
        {options}
    </div>);
}
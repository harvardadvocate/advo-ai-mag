import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';

function TextButton(props) {
    const onClickFunc = props.onClickFunc,
    text = props.text;
        
    return (
        <Button
            // color='transparent'
            buttonType='text'
            ripple='light'
            className='border-0 bg-blue-500 hover:bg-mid-gray'
            onClick={onClickFunc}
        >
            {text}
        </Button>
    )
}

function IconButton(props) {
    const onClickFunc = props.onClickFunc,
        icon = props.icon;
        
    return (
        <Button
            color={props.color ? props.color : 'gray'}
            buttonType='outline'
            iconOnly={true}
            ripple='dark'
            className='border-0'
            onClick={onClickFunc}
        >
            <Icon name={icon} size={props.size ? props.size : '3xl'} />
        </Button>
    )
}

function BlueButton(props) {
    const onClickFunc = props.onClickFunc,
        icon = props.icon;

    return (
        <Button
            color='blue'
            buttonType='outline'
            iconOnly={true}
            ripple='dark'
            className='border-0'
            onClick={onClickFunc}
        >
            <Icon name={icon} size='3x1' />
        </Button>
    )
}
export { TextButton, IconButton, BlueButton }
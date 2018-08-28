/* eslint-disable react/destructuring-assignment */
import React, {Component} from 'react';
import {TextInput} from 'react-native'; // eslint-disable-line
import PropTypes from 'prop-types';
import {propsEqual} from 'react-shallow-equal';

export default class TextInputAdapter extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        caretPosition: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this._setNativeProps(this.props.value, this.props.caretPosition);
    }

    componentWillReceiveProps(nextProps) {
        this._setNativeProps(nextProps.value, nextProps.caretPosition);
    }

    shouldComponentUpdate(nextProps) {
        return !propsEqual(this.props, nextProps, {
            ignore: ['value', 'caretPosition'],
        });
    }

    get caretPosition() {
        return this._selection || 0;
    }

    // onChange() runs before onSelectionChange(), so when text-mask gets selection
    // it's a previous value instead of the current one.
    _onSelectionChange = (event) => {
        this._selection = event.nativeEvent.selection.end;

        if (this._lastOnChangeEvent) {
            this.props.onChange(this._lastOnChangeEvent);
            this._lastOnChangeEvent = undefined;
        }
    };

    _getRef = (ref) => {
        this.input = ref;
    };

    _onChange = ({nativeEvent}) => {
        this._lastOnChangeEvent = nativeEvent;
    };

    _setNativeProps(value, caretPosition) {
        this.input.setNativeProps({text: value});
        this.input.setNativeProps({selection: {start: caretPosition, end: caretPosition}});
    }

    _selection;

    _lastOnChangeEvent;

    render() {
        const {value, caretPosition, onChange, ...rest} = this.props;

        return (
            <TextInput
                {...rest}
                ref={this._getRef}
                onChange={this._onChange}
                onSelectionChange={this._onSelectionChange}
            />
        );
    }
}

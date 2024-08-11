import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { FluentOptionSet, FluentOptionSetProps } from "./FluentOptionSet"; 
import * as React from "react";

export class PCFFluentOptionSet implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private _selectedValue: number;
    private _options: ComponentFramework.PropertyHelper.OptionMetadata[];
    private _isDarkMode: boolean;
    private _formFactor: number;
    private _isDisabled: boolean;

    constructor() { 
        this._selectedValue = 0;
        this._options = [];
        this._isDarkMode = false;
        this._formFactor = 0; 
        this._isDisabled = false;

    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this._updateContextValues(context);

        const optionsetFieldControl = context.parameters.optionsetFieldControl;
        this._selectedValue = optionsetFieldControl.raw || 0; 
        this._options = optionsetFieldControl.attributes?.Options || [];
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        this._updateContextValues(context);

        const props: FluentOptionSetProps = {
            selectedValue: this._selectedValue,
            options: this._options,
            onChange: this._updateValue.bind(this),
            isDarkMode: this._isDarkMode,
            formFactor: this._formFactor,
            disabled: this._isDisabled
        };

        return React.createElement(FluentOptionSet, props);
    }

    private _updateContextValues(context: ComponentFramework.Context<IInputs>): void {
        this._isDarkMode = context.fluentDesignLanguage?.isDarkTheme ?? false;
        this._formFactor = context.client.getFormFactor();
        this._isDisabled = context.mode.isControlDisabled;
    }
    
    private _updateValue(newValue: number | undefined): void {
        if (newValue !== undefined) {
            this._selectedValue = newValue;
            this.notifyOutputChanged();
        }
    }

    public getOutputs(): IOutputs {
        return { 
            optionsetFieldControl: this._selectedValue
        };
    }

    public destroy(): void {
        // Cleanup if necessary
    }
}

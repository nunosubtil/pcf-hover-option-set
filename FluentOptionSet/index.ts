import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { FluentOptionSet, FluentOptionSetProps } from "./FluentOptionSet"; 
import * as React from "react";

export class PCFFluentOptionSet implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private _selectedValue: number;
    private _options: ComponentFramework.PropertyHelper.OptionMetadata[];
    private _isDarkMode: boolean;

    constructor() { 
        this._selectedValue = 0; // Initialize with a default value
        this._options = [];
        this._isDarkMode = false;
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this._isDarkMode = context.fluentDesignLanguage?.isDarkTheme ?? false;

        const optionsetFieldControl = context.parameters.optionsetFieldControl;

        this._selectedValue = optionsetFieldControl.raw || 0; 
        this._options = optionsetFieldControl.attributes?.Options || [];
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        this._selectedValue = context.parameters.optionsetFieldControl.raw || 0; 
        this._options = context.parameters.optionsetFieldControl.attributes?.Options || [];
        
        const props: FluentOptionSetProps = {
            selectedValue: this._selectedValue,
            options: this._options,
            onChange: this._updateValue.bind(this),
            isDarkMode: this._isDarkMode,
            configuration: null
        };
    
        return React.createElement(FluentOptionSet, props);
    }

    private _updateValue(newValue: number | undefined): void {
        if (newValue !== undefined) {
            this._selectedValue = newValue;
            this.notifyOutputChanged();
        }
    }

    public getOutputs(): IOutputs {
        return { 
            optionsetFieldControl: this._selectedValue // Ensure _selectedValue is always a number
        };
    }

    public destroy(): void {
        // Cleanup if necessary
    }
}

import * as React from 'react';
import { Label, Dropdown, IDropdownOption } from '@fluentui/react';

export interface FluentOptionSetProps {
  selectedValue: number | null;
  options: ComponentFramework.PropertyHelper.OptionMetadata[];
  onChange: (newValue: number) => void;
  isDarkMode: boolean;
  label?: string;
}

export class FluentOptionSet extends React.Component<FluentOptionSetProps> {
  public render(): React.ReactNode {
    const { label, selectedValue, options, isDarkMode } = this.props;

    const dropdownOptions: IDropdownOption[] = options.map(option => ({
      key: option.Value,
      text: option.Label
    }));

    const selectedKey = selectedValue !== null ? selectedValue : undefined;

    return (
      <div style={{ color: isDarkMode ? 'white' : 'black' }}>
        {label && <Label>{label}</Label>}
        <Dropdown
          selectedKey={selectedKey}
          options={dropdownOptions}
          onChange={this.onChange}
          styles={{ dropdown: { width: 300 } }} 
        />
      </div>
    );
  }

  private onChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ): void => {
    if (option) {
      this.props.onChange(option.key as number);
    }
  };
}

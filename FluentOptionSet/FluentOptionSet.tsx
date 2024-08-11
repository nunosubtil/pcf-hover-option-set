/* eslint-disable react/prop-types */
import * as React from 'react';
import styles from './styles/styles';

export interface FluentOptionSetProps {
  selectedValue: number | null;
  options: ComponentFramework.PropertyHelper.OptionMetadata[];
  onChange: (newValue: number | undefined) => void;
  isDarkMode: boolean;
  disabled: boolean; 
}

export const FluentOptionSet: React.FunctionComponent<FluentOptionSetProps> = React.memo((props) => {
  const { selectedValue, options, onChange, isDarkMode, disabled } = props;

  const valueKey = selectedValue != null ? selectedValue.toString() : undefined;

  const isMobile = window.innerWidth <= 600;

  const onChangeOption = (key: string) => {
    if (!disabled) {
      onChange(parseInt(key));
    }
  };

  return (
    <div
      style={{
        ...styles.optionSetContainer,
        ...(isDarkMode ? styles.optionSetContainerDark : {}),
        padding: '0px',
        boxSizing: 'border-box',
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row' as const,
          flexWrap: 'wrap',
          justifyContent: 'flex-start', 
          gap: '5px', 
          width: '100%',
        }}
      >
        {options.map((item) => (
          <div
            key={item.Value.toString()}
            style={{
              ...styles.optionSetChoice,
              ...(isDarkMode ? styles.optionSetChoiceDark : {}),
              ...(valueKey === item.Value.toString()
                ? isDarkMode
                  ? styles.optionSetChoiceSelectedDark
                  : styles.optionSetChoiceSelected
                : {}),
              userSelect: 'none',
              padding: '5px 15px',
              flexBasis: 'auto',
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
            onClick={() => onChangeOption(item.Value.toString())}
            onMouseEnter={(e) => {
              if (!disabled) {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = valueKey === item.Value.toString()
                  ? isDarkMode 
                    ? styles.optionSetChoiceSelectedDark.backgroundColor 
                    : styles.optionSetChoiceSelected.backgroundColor
                  : isDarkMode 
                    ? styles.optionSetChoiceDark.backgroundColor 
                    : styles.optionSetChoice.backgroundColor;
                if (!isMobile) {
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.1)';
                }
              }
            }}            
            onMouseLeave={(e) => {
              if (!disabled) {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = valueKey === item.Value.toString()
                  ? isDarkMode 
                    ? styles.optionSetChoiceSelectedDark.backgroundColor 
                    : styles.optionSetChoiceSelected.backgroundColor
                  : isDarkMode 
                    ? styles.optionSetChoiceDark.backgroundColor 
                    : styles.optionSetChoice.backgroundColor;
                if (!isMobile) {
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                }
              }
            }}
            
          >
            <span>{item.Label}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

FluentOptionSet.displayName = 'FluentOptionSet';

/* eslint-disable react/prop-types */
import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './styles/styles';

export interface HoverOptionSetProps {
  selectedValue: number | null;
  options: ComponentFramework.PropertyHelper.OptionMetadata[];
  onChange: (newValue: number | undefined) => void;
  isDarkMode: boolean;
  disabled: boolean; 
  formFactor: number;
}

export const HoverOptionSet: React.FunctionComponent<HoverOptionSetProps> = (props) => {
  const { selectedValue, options, onChange, isDarkMode, disabled, formFactor } = props;

  const [isMobile, setIsMobile] = useState(formFactor === 2 || formFactor === 3);

  const valueKey = selectedValue != null ? selectedValue.toString() : undefined;

  const onChangeOption = (key: string) => {
    if (!disabled) {
      onChange(parseInt(key));
    }
  };

  useEffect(() => {
    setIsMobile(formFactor === 2 || formFactor === 3);
  }, [formFactor]);

  return (
    <div
      style={{
        ...styles.optionSetContainer,
        ...(isDarkMode ? styles.optionSetContainerDark : {}),
        padding: isMobile ? '5px' : '0px',
        boxSizing: 'border-box',
        opacity: 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          flexWrap: 'wrap', 
          justifyContent: 'flex-start',
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
              padding: '5px',
              flexGrow: 0, 
              flexBasis: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: disabled ? 'not-allowed' : 'pointer',
              boxSizing: 'border-box',
              height: '30px',
              marginBottom: '5px',
              whiteSpace: 'nowrap',
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
};

HoverOptionSet.displayName = 'HoverOptionSet';

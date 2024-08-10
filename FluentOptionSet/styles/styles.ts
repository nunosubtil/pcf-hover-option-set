const colors = {
  white: '#ffffff',
  darkGray: '#333',
  lightGray: '#fefefe',
  mediumGray: '#adadad',
  lightBackground: '#f8f9fa',
  darkBackground: '#666666',
  lightHoverBackground: '#E7EFF7',
  darkHoverBackground: '#777777',
  activeBlue: '#1160B7',
  veryDarkGray: '#1f1f1f',
};

const styles = {
  optionSetContainer: {
    padding: '10px',
    backgroundColor: colors.white,
  },
  optionSetContainerDark: {
    padding: '10px',
    backgroundColor: colors.veryDarkGray,
  },
  optionSetLabel: {
    marginBottom: '10px',
    fontSize: '14px',
    fontWeight: 600,
    color: colors.darkGray,
  },
  optionSetLabelDark: {
    marginBottom: '10px',
    fontSize: '14px',
    fontWeight: 600,
    color: colors.lightGray,
  },
  optionSetChoices: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionSetChoice: {
    padding: '10px 15px',
    margin: '5px',
    borderRadius: '6px',
    backgroundColor: colors.lightBackground,
    color: colors.darkGray,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  optionSetChoiceDark: {
    padding: '10px 15px',
    margin: '5px',
    borderRadius: '6px',
    backgroundColor: colors.darkBackground,
    color: colors.mediumGray,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  optionSetChoiceSelected: {
    backgroundColor: colors.activeBlue,
    color: 'white',
  },
  optionSetChoiceSelectedDark: {
    backgroundColor: colors.veryDarkGray,
    color: 'white',
  },
  optionIcon: {
    marginRight: '8px',
  },
};

export default styles;

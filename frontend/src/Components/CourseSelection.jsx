import * as React from "react";
import PropTypes from "prop-types";
import { Select as BaseSelect, selectClasses } from "@mui/base/Select";
import { Option as BaseOption, optionClasses } from "@mui/base/Option";
import { styled } from "@mui/system";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import { useState } from "react";

const options = [
  { value: 10, name: "Confederation Park (9)" },
  { value: 20, name: "Lakeview (9)" },
  { value: 30, name: "Maple Ridge (18)" },
  { value: 40, name: "McCall Lake (18)" },
  { value: 50, name: "McCall Lake Par 3 (9)" },
  { value: 60, name: "Shaganappi Point (18)" },
  { value: 70, name: "Shaganappi Valley (9)" },
  { value: 80, name: "Shaganappi Valley Back (9)" },
];

export default function CourseSelection( ) {
  const [courseSelected, setCourseSelected] = useState([10]);

  const handleSelectionChange = (event) => {
    const values = event.target.value;
    setCourseSelected(values);
    const selectedNames = options
      .filter(option => values.includes(option.value))
      .map(option => option.name);
      
    console.log("Selected options:", selectedNames);

    onSelectValueChange(values); 
  };

  console.log("courseSelected:", courseSelected);

  return (
    <MultiSelect value={courseSelected} onChange={handleSelectionChange}>
      {options.map(option => (
        <Option key={option.value} value={option.value}>{option.name}</Option>
      ))}
    </MultiSelect>
  );
}

CourseSelection.propTypes = {
    onSelectValueChange: PropTypes.func.isRequired, 
};

const MultiSelect = React.forwardRef(function CustomMultiSelect(props, ref) {
  const slots = {
    root: Button,
    listbox: Listbox,
    popup: Popup,
    ...props.slots,
  };

  return <BaseSelect {...props} multiple ref={ref} slots={slots} />;
});

MultiSelect.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    listbox: PropTypes.elementType,
    popup: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
};

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Button = React.forwardRef(function Button(props, ref) {
  const { ownerState, ...other } = props;
  return (
    <StyledButton type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </StyledButton>
  );
});

Button.propTypes = {
  children: PropTypes.node,
  ownerState: PropTypes.object.isRequired,
};

const StyledButton = styled("button", { shouldForwardProp: () => true })(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 1.275rem;
  box-sizing: border-box;
  min-width: 620px;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  position: relative;
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &.${selectClasses.focusVisible} {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  `
);

const Listbox = styled("ul")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 1.275rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 2px 6px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
  };
  `
);

const Option = styled(BaseOption)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  transition: border-radius 300ms ease;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  @supports selector(:has(*)) {
    &.${optionClasses.selected} {
      & + .${optionClasses.selected} {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }

      &:has(+ .${optionClasses.selected}) {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &:focus-visible {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }
  `
);

const Popup = styled("div")`
  z-index: 1;
`;

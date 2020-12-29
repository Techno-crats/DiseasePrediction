import React from "react";
import styled from 'styled-components'


const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

const Hide = {
  border: 0,
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1
}

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${props => (props.checked ? 'salmon' : 'papayawhip')}
  box-shadow: ${props => (props.checked ? '0 0 0 3px pink' : 'none')}
  border -radius: 3px;
  transition: all 150ms;

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')}
  }
`

// const Checkbox = ({ className, checked, ...props }) => (
//
//
//
// )

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (

<div className="form-check">
  <label>
    <input
      type="checkbox"
      name={label}
      checked={isSelected}
      onChange={onCheckboxChange}
      className="form-check-input"
      style={Hide}
    />
    <StyledCheckbox checked={isSelected}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
    {label}
  </label>
</div>

);

export default Checkbox;

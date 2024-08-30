import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect( props:{label:string, inputs:string[],
    callback: (e: SelectChangeEvent<string>) => void
}) {
  const [select, setSelect] = React.useState(props.inputs[0]);

  const handleChange = (e: SelectChangeEvent<string>) => {
    props.callback(e);
    setSelect(e.target.value as string);
  };

  return (
    <Box display="flex" justifyContent="center" >
      <FormControl sx={{  width: 150, mt: 3 }}>
        <InputLabel id="demo-simple-select-label" sx={{marginBottom:50}}>{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={select}
          label="Age"
          onChange={handleChange}
        >
          {props.inputs.map((input) => (
            <MenuItem key={input} value={input}>{input}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

}
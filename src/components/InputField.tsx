import React from 'react';

type Prop = {
  name: string;
  gettingInformation: boolean;
};
/**
 * Creates the input fields for the form
 */

export default function InputField({ name, gettingInformation }: Prop) {
  return (
    <div className="inputField">
      <label htmlFor={name}>Enter {`${name}`} port code:</label>
      <input
        type="text"
        name={name}
        list="portList"
        required
        disabled={gettingInformation}
      />
    </div>
  );
}

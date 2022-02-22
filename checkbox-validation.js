import { useState } from 'react';
function CheckBoxForm () {
  const [checked, setChecked] = useState(false);
  return (
    <form>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => setChecked(e.target.checked)}
      />
    </form>
  )
}

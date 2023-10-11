import * as React from "react";
import { Locker } from "../../classes/Locker";

export function LockerTester() {
  const [m_Locker] = React.useState(new Locker());
  const [m_Counter, setCounter] = React.useState(0);

  return (
    <div>
      <label>Counter:</label>
      <label>{m_Counter}</label>
      <button
        onClick={async () => {
          const release = await m_Locker.aquire("add");
          try {
            await new Promise<void>((resolve) => {
              setTimeout(() => {
                setCounter((previousState) => previousState + 1);
                resolve();
              }, 10000);
            });
          } catch (error) {
            console.log(error);
          } finally {
            release();
          }
        }}
      >
        Add
      </button>
    </div>
  );
}

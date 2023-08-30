import { useEffect, useRef } from "react";
import styled from "styled-components";

const CartProgress = ({ task, taskDone }) => {
  const taskRef = useRef("");
  useEffect(() => {
    if (taskDone == true) {
      taskRef.current.style.color = "blue";
    }
  });
  return (
    <COntainer>
      <Task ref={taskRef}>{task}</Task>
    </COntainer>
  );
};

export default CartProgress;

const COntainer = styled.div`
  width: 100%;
  height: 100%;
`;
const Task = styled.h5`
  font-family: var(--quick-font);
  font-size: small;
  font-weight: 400;
  letter-spacing: 1px;
  color: black;
`;

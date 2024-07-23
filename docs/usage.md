---
sidebar_label: 用法
---

本 Demo 演示一行文字的用法。

```jsx preview
import { useEffect } from 'react';
import useGlobalState, { setInitState, setGlobalState } from 'react-global-state-manage';
import styles from './usage.module.css';
import noop from './usage.js';

function ChildA() {
  console.log('ChildA')
  const [count, setCount] = useGlobalState('DEMO_STATE/count')
  return <div className={styles.child} onClick={() => setCount(Math.floor(Math.random() * 1000))}>{count}</div>
}

function ChildB() {
  console.log('ChildB')
  const [age] = useGlobalState('DEMO_STATE/age')
  return <div className={styles.child}>{age}</div>
}

function ChildC() {
  console.log('ChildC')
  const [demoState, setDemoState] = useGlobalState('DEMO_STATE')
  return <div className={styles.child} onClick={() => setDemoState({count: Math.floor(Math.random() * 1000), age:  Math.floor(Math.random() * 20)})}>{JSON.stringify(demoState)}</div>
}

export default function App () {

  setInitState({count: 10, age: 18}, 'DEMO_STATE');

  useEffect(() => {
    setTimeout(() => {
      setGlobalState(999, 'DEMO_STATE/count')
    }, 2000)
  }, [])

  return (
    <div className={styles.mod}>
      <ChildA />
      <ChildB />
      <ChildC />
    </div>
  )
}
```

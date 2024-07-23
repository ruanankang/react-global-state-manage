---
sidebar_label: 用法
---

本 Demo 演示一行文字的用法。

```jsx preview
import GlobalState from 'react-global-state-manage';
import styles from './usage.module.css';
import noop from './usage.js';

export default function App () {
  return (
    <div className={styles.usageContainer}>
      <GlobalState />
    </div>
  )
}
```

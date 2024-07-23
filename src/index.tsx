import * as React from 'react';
import styles from './index.module.css';

interface ComponentProps {
  /** Title for GlobalState. */
  title: string;
}

export default function GlobalState(props: ComponentProps) {
  const { title = 'Hello World!' } = props;

  return (
    <div className={styles.GlobalState}>{title}</div>
  );
}

import { useApp } from "../../contexts/AppContext"
import ThemeToggle from "./ThemeToggle"
import styles from "./header.module.css"

const Header = () => {
  const { theme } = useApp()

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>To-Do & Notes</h1>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header

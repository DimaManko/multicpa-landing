import type { Tasks as TasksData } from '@/shared/api'
import snake from '@/shared/assets/img/multi-tasks-snake.png'
import { SectionLabel } from '@/shared/ui/SectionLabel'

import styles from './Tasks.module.scss'

type Props = {
    description: TasksData['description']
    tiles: TasksData['tiles']
}

export function Tasks({ description, tiles }: Props) {
    const formattedDescription = description.replace(
        /[ \t]+no outsourcing/i,
        '\nno outsourcing',
    )

    return (
        <section className={styles.screen} aria-label="Multi-tasks">
            <div className={styles.container}>
                <SectionLabel>Multi-tasks</SectionLabel>

                <div className={styles.grid}>
                    <div className={styles.intro}>
                        <p className={styles.description}>
                            {formattedDescription.split(/(in-house team)/i).map((part, index) =>
                                part.toLowerCase() === 'in-house team' ? (
                                    <span className={styles.highlight} key={index}>
                                        {part}
                                    </span>
                                ) : (
                                    part
                                ),
                            )}
                        </p>
                        <img className={styles.image} src={snake} alt="" />
                    </div>

                    <div className={styles.cards}>
                        {[tiles.slice(0, 2), tiles.slice(2)].map((column, columnIndex) => (
                            <div className={styles.column} key={columnIndex}>
                                {column.map(({ title, text }) => (
                                    <article className={styles.card} key={title}>
                                        <h2 className={styles.title}>{title}</h2>
                                        <p className={styles.text}>{text}</p>
                                    </article>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
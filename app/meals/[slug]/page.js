import { getMeal } from '@/lib/meals';
import styles from './page.module.css';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateMetadata({params}){
    const meal = getMeal(params.slug);

    if(!meal){
        notFound();
    }

    return {
        title: meal.title,
        description: meal.summary
    };
}

const MealDetails = ({params}) => {
    const meal = getMeal(params.slug);

    if(!meal){
        // if meal is not found, then navigate to the closes not found page
        notFound();
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br />')
    return ( 
        <>
            <header className={styles.header}>
                <div className={styles.image}>
                    <Image src={meal.image} fill/>
                </div>
                <div className={styles.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={styles.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={styles.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p className={styles.instructions} dangerouslySetInnerHTML={{
                    __html:meal.instructions,
                }}>

                </p>
            </main>
        </>
    );
}
 
export default MealDetails;
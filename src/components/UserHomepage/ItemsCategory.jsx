import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';

import ItemsBox from './ItemBox/ItemsBox.jsx';
import OrderSummary from './OrderSummary/OrderSummary.jsx';
import styles from './MenuHomepage.module.css';


const ItemsCategory = ({ items }) => {
    const [search, setSearch] = useState('');
    const modalRef = useRef();
    const iconRef = useRef();
    const [queryItems, setQueryItems] = useState(items.items);
    const [activeCategory, setActiveCategory] = useState(items.category[0]._id);
    const [modalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            const categoryElements = document.querySelectorAll('[data-category]');
            let currentActiveCategory = null;
            let smallestPositiveTop = Infinity;

            categoryElements.forEach((element) => {
                const rect = element.getBoundingClientRect();

                if (rect.top >= 0 && rect.top < smallestPositiveTop) {
                    smallestPositiveTop = rect.top;
                    currentActiveCategory = element.getAttribute('data-category');
                }
            });
            setActiveCategory(currentActiveCategory);
        };

        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handler = (event) => {
            if(iconRef.current.contains(event.target)){
                setModalOpen(!modalOpen);
            }
            else if (!modalRef.current.contains(event.target))
                setModalOpen(false);
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    });

    const searchList = (search) => {
        setSearch(search);
        const newList = items.items.filter((item) => search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search));
        setQueryItems(newList);
    }

    return (
        <div className={styles.outer}>
            <aside className={modalOpen ? styles.open : null} ref={modalRef}>
                <div className={styles.categories}>
                    {
                        items.category.map((category) => {
                            if (queryItems.some((item) => item.categoryId === category._id))
                                return (
                                    <div className={`${styles.category_item} ${activeCategory === category._id ? styles.active : ''}`}>
                                        <Link
                                            to={category.name}
                                            smooth={true}
                                            offset={-100}
                                            duration={200}
                                        >
                                            {category.name}
                                        </Link>
                                    </div>);
                        })
                    }
                </div>
            </aside>
            <main>
                <div className={styles.heading}>
                    <h1>Vinayak Night Canteen</h1>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => searchList(e.target.value)}
                            className={styles.search_box}
                            placeholder="Search Item..."
                        />
                        <div onClick={() => searchList('')}>
                            <img src="./x.png" alt="X sign" />
                        </div>
                    </div>
                </div>
                {queryItems.length > 0 ? <div className={styles.container}>
                    {items.category.map((category) => {
                        if (queryItems.some((item) => item.categoryId === category._id))
                            return (
                                <div
                                    className={styles.category}
                                    key={category._id}
                                    data-category={category._id}>
                                    <div className={styles.heading} id={category.name} name={category.name}>
                                        <h2>{category.name}</h2>
                                    </div>
                                    <hr />
                                    <div className={styles.items}>
                                        {queryItems.filter((itemGroup) => itemGroup.categoryId === category._id)
                                            .map((itemGroup) => <ItemsBox itemGroup={itemGroup} />)
                                        }
                                    </div>
                                </div>
                            )
                    }
                    )}
                </div> : <div className={styles.no_items}> No Items Found.</div>}

                <div className={styles.catgeory_btn}  ref={iconRef}>
                    <img src="./category.png" alt="category button" />
                </div>
            </main>
            <OrderSummary />
        </div>
    )

}

export default ItemsCategory;
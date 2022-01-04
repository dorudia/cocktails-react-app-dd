import React, {useState} from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
import {useGlobalContext} from "../context";
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
    const {setSearchTerm} = useGlobalContext()
    const {id,} = useParams()
    const [loading, setLoading] = useState(false);
    const [cocktail, setCocktail] = useState(null);
    React.useEffect(() => {
        setLoading(true)
        async function getCocktail() {
            try {
                const res = await fetch(`${url}${id}`)
                const data = await res.json()
                console.log(data)

                if(data.drinks) {
                   const {strDrink:name, strDrinkThumb:image, strAlcoholic:info,
                          strCategory:category, strGlass:glass, strInstructions:instructions,
                          strIngredient1:ingredient1, strIngredient2:ingredient2,
                          strIngredient3:ingredient3, strIngredient4:ingredient4,
                          strIngredient5:ingredient5, strIngredient6:ingredient6,
                   } = data.drinks[0]
                    const ingredients = [ingredient1,ingredient2,ingredient3,
                                       ingredient4, ingredient5, ingredient6]
                    const newCocktail = {name, image, info, category, glass, ingredients, instructions}
                    setCocktail(newCocktail)
                    setLoading(false)
                } else {
                    setCocktail(null)
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        getCocktail()
    },[id])

    if(loading) {
        return <Loading/>
    }
    if(!cocktail) {
        return <h3 className={'section-title'}>no cocktail to display</h3>
    }
    const {name, image, category, glass, info, instructions, ingredients} = cocktail

    return (
    <section className={'section cocktail-section'}>
        <Link to="/" className={'btn btn-primary'}>
            <b style={{width: '100%', height: '100%'}} onClick={() => setSearchTerm('a')}>back home</b>
        </Link>
      <h2 className={'section-title'}>{name}</h2>
        <div className={'drink'}>
            <img src={image} alt={name}/>
            <div className="drink-info">
                <p>
                    <span className={'drink-data'}>name :</span>
                    {name}
                </p>
                <p>
                    <span className={'drink-data'}>category :</span>
                    {category}
                </p>
                <p>
                    <span className={'drink-data'}>info :</span>
                    {info}
                </p>
                <p>
                    <span className={'drink-data'}>glass :</span>
                    {glass}
                </p>
                <p>
                    <span className={'drink-data'}>instructions :</span>
                    {instructions}
                </p>
                <p>
                    <span className={'drink-data'}> ingredients :</span>
                    {ingredients.map((item,index) => {
                        return item? <span key={index}>{item}</span>: null
                    })}
                </p>

            </div>
        </div>
    </section>
  )
}

export default SingleCocktail

import React , {useEffect} from 'react'
import {Link,useParams} from 'react-router-dom'
import { useNavigate } from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart , removeFromCart} from '../actions/cartActions'

import { useLocation } from 'react-router-dom'



const CartScreen = () => {

    const {id} = useParams()
    const navigate =useNavigate()
    const productId = id
    const{search} = useLocation();

    const sp = new URLSearchParams(search);
    
    const qty = sp.get('qty') || 0;
    console.log(qty)

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    console.log(cartItems)



    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch,productId,qty])


    const removeFromCartHandler = (id) => {
           dispatch(removeFromCart(id))

    }




    const checkoutHandler = () => {
        navigate("/login?redirect=/shipping")

}
return <Row>
    
<Col md={8}>

<h1>Shopping Cart</h1>
{cartItems.length === 0 ? (<Message> Your cart is empty <Link to='/'>Go Back</Link> </Message>) :

(<ListGroup variant = 'flush'>{cartItems.map(item => (

<ListGroup.Item key={item.product}> 


<Row> <Col md={2}>

    <Image src={item.image} alt={item.name} fluid rounded />
 
</Col>
<Col md={3}> <Link to={`/product/${item.product}`}>{item.name}</Link></Col>
<Col md={2}>${item.price}</Col>
<Col md={2}><Form.Control as='select' value={item.qty} onChange={(e) =>
     dispatch(addToCart(item.product, Number(e.target.value)))}>

{  [...Array(item.countInStock).keys()].map((x) => (
<option key={x + 1} value={x+1}>{x+1}</option>))}
  </Form.Control></Col>

  <Col md={2}><Button tpe='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
    <i className='fas fa-trash'></i></Button> </Col>


</Row></ListGroup.Item>))}</ListGroup>)}
</Col >

<Col md={4}>
<Card>
<ListGroup variant='flush'>
    <ListGroup.Item>
    <h2>Subtotal ({cartItems.reduce((acc,item) => acc + Number(item.qty),0)}) items</h2>
    ${cartItems.reduce((acc,item) => acc + item.qty * item.price,0).toFixed(2)}

    </ListGroup.Item>

    <ListGroup.Item> <Button type='button' className='btn col-12' disabeled ={cartItems.length === 0 } onClick ={checkoutHandler}> Proceed to Checkout</Button> </ListGroup.Item>
</ListGroup>

</Card>

</Col>





</Row>

    
}


export default CartScreen

import React from 'react';
import {Card,CardImg,CardImgOverlay,CardTitle,Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link , NavLink} from 'react-router-dom';

function RenderMenuItem({dish,onMouseEnter,displayDish}){
    return (
        <Link to={`/menu/${dish.id}`} >
            <Card  onMouseEnter={()=>onMouseEnter(dish.id)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
               <CardTitle > {dish.name} </CardTitle>
               {displayDish(dish)}
            </CardImgOverlay>
            </Card>
        </Link>
    );
}

const Menu = (props) => {
    const menu=props.dishes.map((dish)=>{
        return(
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish} onMouseEnter={props.onMouseEnter} displayDish={props.displayDish} />
            </div>
        );
    });
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
               {menu}
            </div>
        </div>
    );  
}

export default Menu ;
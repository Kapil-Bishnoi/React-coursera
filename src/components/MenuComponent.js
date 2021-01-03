import React from 'react';
import {Card,CardImg,CardImgOverlay,CardTitle,Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link , NavLink} from 'react-router-dom';

function RenderMenuItem({dish,onDishEnter,displayLittleDishInfo}){
    return (
        <Link to={`/menu/${dish.id}`} >
            <Card  onMouseEnter={()=>onDishEnter(dish.id)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
               <CardTitle > {dish.name} </CardTitle>
               {displayLittleDishInfo(dish)}
            </CardImgOverlay> 
            </Card>
        </Link>
    );
}

const Menu = (props) => {
    const menu=props.dishes.map((dish)=>{
        return(
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish} onDishEnter={props.onDishEnter} displayLittleDishInfo={props.displayLittleDishInfo} />
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
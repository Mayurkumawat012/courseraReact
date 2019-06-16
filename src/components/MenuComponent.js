import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';
import DishDetail from './DishDetailComponent';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectdDish: null
        }
    }

    onDishSelect(dish){
      this.setState({selectdDish: dish});
    }

    // renderDish(dish) {
    //   if(dish != null) {
    //     return(
    //       <Card>
    //           <CardImg width="100%" src={dish.image} alt={dish.name} />
    //           <CardBody>
    //             <CardTitle>{dish.name}</CardTitle>
    //             <CardText>{dish.description}</CardText>
    //           </CardBody>
    //       </Card>

    //     )
    //   }
    //   else {
    //     return(
    //     <div></div>
    //     );
    //   }
    // }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card onClick = {() => this.onDishSelect(dish)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  
                  <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
              </div>
            );
        });

        return (
          <div className="container">
            <div className="row">
                {menu}
            </div>
          <DishDetail dish={this.state.selectdDish} />
          </div>
        );
    }
}

export default Menu;
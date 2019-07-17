import React,{ Component} from 'react';
import { Card, CardImg,Form, FormGroup,Row, Input, Label, Modal, ModalHeader, ModalBody, CardImgOverlay, CardText, CardBody, CardTitle,  Breadcrumb, BreadcrumbItem,Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class DishDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            // isNavOpen: false,
            isModalOpen: false
        };
        this.RenderDish = this.RenderDish.bind(this);
        this.RenderComments = this.RenderComments.bind(this);
        this.toggleModalComment = this.toggleModalComment.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
        this.setState({
            isModalOpen: !this.state.isModalOpen
          });
    }

    toggleModalComment(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
          });
    }


    RenderDish({dish}) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

 

    RenderComments({comments}) {
        var commentList = comments.map(comment => {
            return (
                <li key={comment.id} >
                    {comment.comment}
                    <br /><br />
                    -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                    <br /><br />
                </li>
            );
        });
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {commentList}
                    <Button outline onClick={this.toggleModalComment}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                </ul>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModalComment} style={{width:"450px"}}>
                    <ModalHeader toggle={this.toggleModalComment}>Submit Comment</ModalHeader>
                    <ModalBody className="ml-3 mr-3">
                        <LocalForm onSubmit={(values) => this.handleLogin(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select  model=".rating"  id="rating" name="rating"
                                // innerRef={(input) => this.password = input} 
                                className="form-control" defaultValue="1"
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name">Your Name</Label>
                                <Control.text model=".yourname" id="yourname" name="yourname"
                                placeholder="Your Name" 
                                className="form-control"
                                // innerRef={(input) => this.password = input}
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                />
                                <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name">Comment</Label>
                                <br></br>
                                {/* <textarea style={{borderRadius:'5px'}} rows={5} cols ={49} type="text" id="comment" name="comment" 
                                innerRef={(input) => this.password = input}
                                 /> */}
                                 <Control.textarea model=".comment" id="comment" name="comment"
                                //  innerRef={(input) => this.password = input}
                                        rows="6"
                                        className="form-control" />
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    render() {
     
            if (this.props.dish) {
                return (
                    <div className="container">
                    <div className="row">
                        <Breadcrumb>
    
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <this.RenderDish dish={this.props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <this.RenderComments comments={this.props.comments} />
                        </div>
                    </div>
                    </div>
                );
            }
            else {
                return (
                    <div></div>
                );
            
        }
        
    }
}


export default DishDetail;
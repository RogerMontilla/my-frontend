import React from 'react';
import { Container, Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';
import NetContext from '../Context/NetContext';
import { Link, useHistory } from 'react-router-dom';

export default function Products({ data }) {
  const history = useHistory();
  const goCheckout = (id) => {
    localStorage.setItem('prods', [localStorage.getItem('prods'), id]);
    history.push('/checkout');
  };
  const addProd = (id) => {
    localStorage.setItem('prods', [localStorage.getItem('prods'), id]);
  };

  return (
    <NetContext.Consumer>
      {(context) => (
        <Container>
          <Row md={12}>
            {data.map((prod) => {
              return (
                <Col xl={3} lg={4} md={6} xs={12} key={prod._id}>
                  <Card
                    className="shadow-sm p-3 mb-5 bg-white rounded"
                    style={{ width: '14rem', marginTop: '1rem', alignItems: 'center' }}
                  >
                    <Card.Img
                      variant="top"
                      style={{ height: '8rem', width: '8rem' }}
                      src={`http://localhost:3001/images/${prod.images.filename}`}
                    />
                    <Card.Body style={{ width: '14rem', textAlign: 'left' }}>
                      <h6>{prod.name}</h6>
                      <p>{prod.description.substring(0, 20).concat('...')}</p>
                      {prod.offert && (
                        <div style={{ fontSize: '12px' }}>
                          <p style={{ color: 'red', marginBottom: '5px' }}>
                            <del>Old Price: {prod.price}</del>
                          </p>
                          <p>Offert: {prod.offert}</p>
                        </div>
                      )}
                      {!prod.offert && (
                        <div style={{ fontSize: '12px' }}>
                          <p>Price: {prod.price}</p>
                        </div>
                      )}
                      {context.login && (
                        <div style={{ textAlign: 'center' }}>
                          <ButtonGroup size="sm">
                            <Button
                              style={{ fontSize: '12px', padding: '4px' }}
                              variant="success"
                              onClick={() => {
                                goCheckout(prod._id);
                              }}
                            >
                              Buy Now
                            </Button>
                            <Button as={Link} to={'/prods-detail/' + prod._id} variant="success" style={{fontSize: '12px', padding: '4px' }}>
                              Detail
                            </Button>
                            <Button onClick={() => addProd(prod._id)} variant='success' style={{fontSize: '12px', padding: '4px' }}>Add to Car</Button>
                          </ButtonGroup>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
    </NetContext.Consumer>
  );
}

{
  /* <Button
  onClick={() => {
    let prods = localStorage.getItem('prods').split(',');
    prods.splice(0, 1);
    console.log(prods);
  }}
>
  prods
</Button>; */
}

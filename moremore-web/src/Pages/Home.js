import React, { Component } from "react";
import CardView from "../Components/CardView";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getBestSeller,
  getNewArrival,
  getTotalUserPayment
} from "../Actions/StockActions";
import {
  Segment,
  Message,
  Image,
  Button,
  Container,
  Grid,
  Responsive
} from "semantic-ui-react";
import cover from "../Image/cvphoto.jpg";
import cover2 from "../Image/cover2.jpg";
import Background from "../Image/coverweb.jpg";
import Howto from "../Image/howto.jpg";

const mapStatetoProps = state => {
  return {
    stock: state.stock,
    user: state.user
  };
};

const mapDispatchtoProps = dispatch => ({
  getBestSeller: limitPage => {
    dispatch(getBestSeller(limitPage));
  },
  getNewArrival: limitPage => {
    dispatch(getNewArrival(limitPage));
  },
  getTotalUserPayment: () => {
    dispatch(getTotalUserPayment());
  }
});

class Home extends Component {
  componentDidMount() {
    this.props.getNewArrival(5);
    this.props.getBestSeller(5);
    this.props.getTotalUserPayment();
  }
  render() {
    return (
      <div style={{ backgroundColor: "#ebebeb" }}>
        <Responsive maxWidth={800}>
          {this.props.stock.message !== "" ? (
            <div>
              {this.props.stock.message !== undefined ? (
                <div align="center">
                  <Message
                    style={{ position: "fixed", zIndex: 1, width: "100%" }}
                    positive
                  >
                    <br />
                    <p
                      style={{
                        fontFamily: "Prompt"
                      }}
                    >
                      {this.props.stock.message}
                    </p>
                  </Message>
                </div>
              ) : null}
            </div>
          ) : null}
          <Segment
            style={{
              minWidth: "100%",
              minHeight: "250px",
              backgroundImage: `url(${Background})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100%"
            }}
            vertical
          >
            <Grid stackable>
              <Grid.Row>
                <Grid.Column width={2} />
                <Grid.Column style={{ right: "1%" }} width={10}>
                  <p
                    style={{
                      fontFamily: "Prompt",
                      fontWeight: "Bold",
                      color: "#fbb900",
                      fontSize: "1.5em"
                    }}
                  >
                    หาตัวช่วยของคุณได้ที่นี่
                  </p>
                  <br />
                  <p
                    style={{
                      fontFamily: "Prompt",
                      fontWeight: "Bold",
                      color: "white",
                      fontSize: "0.9em"
                    }}
                  >
                    ตอนนี้เราได้ทำการเปิดรับสมัครนักทำชีทสรุป
                    <br />
                    จำนวนมาก! หากคุณเป็นคนที่รักในการสรุปและ
                    <br />
                    อยากแบ่งปันกับเพื่อนๆ มาสมัครกันได้เลย!
                  </p>
                  <br />
                  <Button
                    as={Link}
                    to="/Sheeter"
                    style={{
                      fontFamily: "Prompt",
                      fontSize: "0.9em",
                      backgroundColor: "#fbb900",
                      color: "#000000"
                    }}
                  >
                    สมัครเป็นนักทำชีทสรุป คลิก!
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    as={Link}
                    to="/Shop"
                    style={{
                      fontFamily: "Prompt",
                      fontSize: "0.9em",
                      backgroundColor: "#fbb900",
                      color: "#000000"
                    }}
                  >
                    เข้าสู่หน้าร้านค้า
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Container>
            <br />
            <p
              align="center"
              style={{
                fontFamily: "Prompt",
                fontWeight: "Bold",
                fontSize: "1.5em"
              }}
            >
              more sheet: Your life saver
              {this.props.stock.totalUser > 0 ? (
                <p>Lives Saved:{" " + this.props.stock.totalUser}</p>
              ) : null}
            </p>
            <h4 align="center">
              <u>
                การใช้งานในโทรศัพท์ให้เปิดผ่าน Safari,Chrome Mobile
                ไม่แนะนำให้ใช้ Browser ของ Facebook หรือ Line
              </u>
            </h4>
          </Container>
          <br />
          <Container>
            <Image
              src={Howto}
              style={{
                marginTop: "10px",
                width: "100%",
                maxWidth: "400px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            />
            {this.props.stock.newArrival.length > 0 ? (
              <div>
                <br />
                <p
                  align="left"
                  style={{
                    fontFamily: "Prompt",
                    fontWeight: "Bold",
                    fontSize: "1.5em"
                  }}
                >
                  New Arrival
                </p>
                <p
                  align="right"
                  style={{
                    fontSize: 20,
                    marginRight: "10%",
                    fontFamily: "Prompt"
                  }}
                >
                  <Link to={"/NewArrival"}> ดูเพิ่มเติม</Link>
                </p>
                {this.props.stock.newArrival.length === 5 ? (
                  <CardView
                    sheetList={this.props.stock.newArrival}
                    center={true}
                    limit={6}
                  />
                ) : null}
              </div>
            ) : null}

            {this.props.stock.bestSeller.length > 0 ? (
              <div>
                <br />
                <p
                  align="left"
                  style={{
                    fontFamily: "Prompt",
                    fontWeight: "Bold",
                    fontSize: "1.5em"
                  }}
                >
                  Best Seller
                </p>
                <p
                  align="right"
                  style={{
                    fontSize: 20,
                    marginRight: "10%",
                    fontFamily: "Prompt"
                  }}
                >
                  <Link to={"/BestSeller"}> ดูเพิ่มเติม</Link>
                </p>
                {this.props.stock.bestSeller.length === 5 ? (
                  <CardView
                    sheetList={this.props.stock.bestSeller}
                    center={true}
                    limit={6}
                  />
                ) : null}
              </div>
            ) : null}
          </Container>

          <br />
        </Responsive>

        <Responsive minWidth={801}>
          <Segment
            style={{
              minWidth: "100%",
              minHeight: "500px",
              backgroundImage: `url(${Background})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100%"
            }}
            vertical
          >
            {this.props.stock.message !== "" ? (
              <Container>
                {this.props.stock.message !== undefined ? (
                  <Message
                    style={{ position: "fixed", zIndex: 1, width: "80%" }}
                    positive
                  >
                    <p
                      style={{
                        fontFamily: "Prompt"
                      }}
                    >
                      {this.props.stock.message}
                    </p>
                  </Message>
                ) : null}
              </Container>
            ) : null}
            <br />
            <br />
            <br />
            <br />
            <br />
            <Grid stackable>
              <Grid.Row>
                <Grid.Column width={2} />
                <Grid.Column style={{ right: "1%" }} width={10}>
                  <p
                    style={{
                      fontFamily: "Prompt",
                      fontWeight: "Bold",
                      color: "#fbb900",
                      fontSize: "3.5em"
                    }}
                  >
                    หาตัวช่วยของคุณได้ที่นี่
                  </p>
                  <br />
                  <p
                    style={{
                      fontFamily: "Prompt",
                      fontWeight: "Bold",
                      color: "white",
                      fontSize: "1.5em"
                    }}
                  >
                    ตอนนี้เราได้ทำการเปิดรับสมัครนักทำชีทสรุป
                    <br />
                    จำนวนมาก! หากคุณเป็นคนที่รักในการสรุปและ
                    <br />
                    อยากแบ่งปันกับเพื่อนๆ มาสมัครกันได้เลย!
                  </p>
                  <br />
                  <Button
                    as={Link}
                    to="/Sheeter"
                    style={{
                      fontFamily: "Prompt",
                      fontSize: "1.2em",
                      backgroundColor: "#fbb900",
                      color: "#000000"
                    }}
                  >
                    สมัครเป็นนักทำชีทสรุป คลิ๊ก!
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    as={Link}
                    to="/Shop"
                    style={{
                      fontFamily: "Prompt",
                      fontSize: "1.2em",
                      backgroundColor: "#fbb900",
                      color: "#000000"
                    }}
                  >
                    เข้าสู่หน้าร้านค้า
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <br />
          <Container>
            <h1 align="center" style={{ fontFamily: "Prompt" }}>
              more sheet: Your life saver
            </h1>
            {this.props.stock.totalUser > 0 ? (
              <h1 align="center" style={{ fontFamily: "Prompt" }}>
                Lives Saved:{" " + this.props.stock.totalUser}
              </h1>
            ) : null}
            <br />
            <h4 align="center">
              <u>
                การใช้งานในโทรศัพท์ให้เปิดผ่าน Safari,Chrome Mobile
                ไม่แนะนำให้ใช้ Browser ของ Facebook หรือ Line
              </u>
            </h4>
            <br />
          </Container>
          <br />
          <Container>
            <Image
              src={Howto}
              style={{
                marginTop: "10px",
                width: "400px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            />
            {this.props.stock.newArrival.length > 0 ? (
              <div>
                <br />
                <h1 align="center" style={{ fontFamily: "Prompt" }}>
                  New Arrival
                </h1>
                <h1
                  align="right"
                  style={{
                    fontSize: 20,
                    marginRight: "10%",
                    fontFamily: "Prompt"
                  }}
                >
                  <Link to={"/NewArrival"}> ดูเพิ่มเติม</Link>
                </h1>
                {this.props.stock.newArrival.length === 5 ? (
                  <CardView
                    sheetList={this.props.stock.newArrival}
                    center={true}
                    limit={6}
                  />
                ) : null}
              </div>
            ) : null}

            {this.props.stock.bestSeller.length > 0 ? (
              <div>
                <br />
                <h1 align="center" style={{ fontFamily: "Prompt" }}>
                  Best Seller
                </h1>
                <h1
                  align="right"
                  style={{
                    fontSize: 20,
                    marginRight: "10%",
                    fontFamily: "Prompt"
                  }}
                >
                  <Link to={"/BestSeller"}> ดูเพิ่มเติม</Link>
                </h1>
                {this.props.stock.bestSeller.length === 5 ? (
                  <CardView
                    sheetList={this.props.stock.bestSeller}
                    center={true}
                    limit={6}
                  />
                ) : null}
              </div>
            ) : null}
          </Container>

          <br />
        </Responsive>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Home);

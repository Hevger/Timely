import React from "react";
import Logo from "../img/logo.png";

class About extends React.Component {
  render() {
    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="hvordan display-4 text-left mb-4">Om</h2>
            <img
              width="400px"
              className="img-fluid rounded mx-auto d-block mb-3"
              src={Logo}
              alt="logo of the company"
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              efficitur tincidunt dignissim. Aliquam gravida arcu non odio
              sollicitudin, porttitor laoreet felis porta. Suspendisse vitae
              nulla sem. Cras varius elit sagittis, imperdiet odio sit amet,
              mattis justo. Nunc auctor nisl quis mauris tincidunt, eu maximus
              nisl maximus. Integer metus velit, suscipit sit amet egestas sed,
              vestibulum mollis nibh. Vestibulum molestie lacinia massa vitae
              consequat. Maecenas porttitor metus non nulla placerat, sit amet
              rutrum erat suscipit. Aliquam eu finibus tellus. Cras tempor vitae
              nisi quis semper. Integer blandit vel nulla quis varius. In hac
              habitasse platea dictumst. Nunc at finibus lectus, et euismod
              magna. Curabitur ac feugiat nulla. Etiam justo lectus, posuere
              ultricies mauris dapibus, accumsan pharetra magna. Duis eros
              lacus, aliquam lobortis laoreet quis, rhoncus vitae nisi. Donec
              sit amet congue odio. Morbi lacinia ligula eget felis aliquet, sit
              amet venenatis velit porttitor. Phasellus a libero placerat,
              luctus est vel, pellentesque ex. Aliquam id risus ut est hendrerit
              accumsan et eget est. Nulla ut magna vestibulum, eleifend ex
              vitae, vestibulum urna. Sed tincidunt efficitur ante sit amet
              placerat. Nunc vitae eros vitae velit mollis lacinia. Nunc
              ultrices ultrices interdum. Maecenas euismod ante nec leo laoreet
              accumsan. Curabitur cursus libero a sapien tincidunt aliquet.
              Praesent ligula augue, cursus pellentesque eros in, ultrices
              posuere elit. Curabitur imperdiet erat a auctor rhoncus. Curabitur
              laoreet rhoncus sapien ut eleifend. Donec gravida sodales
              facilisis. Nunc a justo eleifend, condimentum diam in, pretium
              ante. Pellentesque aliquam dolor quis imperdiet bibendum. Donec
              pharetra mauris quis lorem fermentum feugiat. Nam justo sapien,
              faucibus ut quam id, volutpat pharetra lacus. Nunc imperdiet justo
              nec tellus pellentesque, non varius enim lobortis. Donec quam
              tellus, feugiat non neque et, posuere suscipit sem. Vestibulum
              eros nibh, tempor id nunc non, scelerisque condimentum quam. Morbi
              mattis porttitor placerat. Suspendisse eu bibendum elit. Proin
              nunc turpis, volutpat vitae tortor eu, blandit scelerisque arcu.
              Etiam finibus ex libero, ut aliquet leo faucibus in. Nam luctus,
              felis eget pellentesque fringilla, leo erat tincidunt tortor, at
              luctus tellus libero in lectus. Phasellus ante nisl, interdum a
              cursus sed, condimentum et nisi. Sed pulvinar nec risus imperdiet
              faucibus. Maecenas sed tincidunt nulla, et tristique eros. Vivamus
              interdum dui ante, id porta nisl finibus ut. Aenean vel felis
              orci. Nullam quis elit metus. Integer blandit sapien eros, non
              consequat libero hendrerit sit amet. Nulla pretium odio vitae
              velit placerat elementum. Proin elementum sapien non velit
              lobortis tincidunt quis a ipsum. Ut in dignissim sem. Phasellus
              non dapibus nisl. Pellentesque pretium porttitor bibendum. Donec a
              orci ligula. Fusce tincidunt justo in velit aliquam maximus. Duis
              quis ante consectetur, vulputate enim eget, condimentum massa.
              Phasellus non pretium tellus.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;

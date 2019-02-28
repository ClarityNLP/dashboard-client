import React, { Component } from "react";

const getAnglePoint = (startAngle, endAngle, radius, x, y) => {
    var x1, y1, x2, y2;

    x1 = x + radius * Math.cos((Math.PI * startAngle) / 180);
    y1 = y + radius * Math.sin((Math.PI * startAngle) / 180);
    x2 = x + radius * Math.cos((Math.PI * endAngle) / 180);
    y2 = y + radius * Math.sin((Math.PI * endAngle) / 180);

    return { x1, y1, x2, y2 };
};

export default class Slice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            path: "",
            x: 0,
            y: 0
        };
    }

    componentDidMount() {
        this.animate();
    }

    animate = () => {
        this.draw(0);
    };

    draw = s => {
        let p = this.props,
            tmp_path = [],
            a,
            b,
            c,
            self = this,
            step;

        step = p.angle / (37.5 / 2);

        if (s + step > p.angle) {
            s = p.angle;
        }

        // Get angle points
        a = getAnglePoint(
            p.startAngle,
            p.startAngle + s,
            p.radius,
            p.radius,
            p.radius
        );

        b = getAnglePoint(
            p.startAngle,
            p.startAngle + s,
            p.radius - p.hole,
            p.radius,
            p.radius
        );

        tmp_path.push("M" + a.x1 + "," + a.y1);
        tmp_path.push(
            "A" +
                p.radius +
                "," +
                p.radius +
                " 0 " +
                (s > 180 ? 1 : 0) +
                ",1 " +
                a.x2 +
                "," +
                a.y2
        );
        tmp_path.push("L" + b.x2 + "," + b.y2);
        tmp_path.push(
            "A" +
                (p.radius - p.hole) +
                "," +
                (p.radius - p.hole) +
                " 0 " +
                (s > 180 ? 1 : 0) +
                ",0 " +
                b.x1 +
                "," +
                b.y1
        );

        // Close
        tmp_path.push("Z");

        this.setState({
            path: tmp_path.join(" ")
        });

        if (s < p.angle) {
            self.draw(s + step);
        } else if (p.showLabel) {
            c = getAnglePoint(
                p.startAngle,
                p.startAngle + p.angle / 2,
                p.radius / 2 + p.trueHole / 2,
                p.radius,
                p.radius
            );

            this.setState({
                x: c.x2,
                y: c.y2
            });
        }
    };

    render() {
        console.log("THIS:");
        console.log(this);

        return (
            <g>
                <path
                    d={this.state.path}
                    fill={this.props.fill}
                    stroke={this.props.stroke}
                    strokeWidth={
                        this.props.strokeWidth ? this.props.strokeWidth : 3
                    }
                />
                {this.props.showLabel && this.props.percentValue > 5 ? (
                    <text
                        x={this.state.x}
                        y={this.state.y}
                        fill="#fff"
                        textAnchor="middle"
                    >
                        {this.props.percent
                            ? this.props.percentValue + "%"
                            : this.props.value}
                    </text>
                ) : null}
            </g>
        );
    }
}

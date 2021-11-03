import React from "react";

export default class CircularProgressbar extends React.Component {
    constructor(props) {
        super(props);
        this.progressProperty = this.getProgressProperty(props);
        this.state = {
            animationInited: false
        };

        this.diameter = 2 * this.progressProperty.radius;
        this.width = this.diameter + this.getExtendedWidth();

        this.circumference = 2 * Math.PI * this.progressProperty.radius;
        this.strokeLength = (this.circumference / 360) * (360 - this.progressProperty.cut);
        // this.getProgress = this.getProgress.bind(this);
    }

    componentDidMount() {
        if (this.progressProperty.initialAnimation) {
            setTimeout(() => this.setState({ animationInited: true }), this.progressProperty.initialAnimationDelay);
        }
    }

    componentDidUpdate() {
    }

    getProgressProperty = (object) => {
        return {
            radius: object.radius || 100, // number
            progress: object.progress || 0, // number
            steps: object.steps || 100, // number
            cut: object.cut || 0, // number
            rotate: object.rotate || -90, // number

            strokeWidth: object.strokeWidth || 5, // number
            strokeColor: object.strokeColor || "#1C89BF", // string
            fillColor: object.fillColor || "none", // string
            strokeLinecap: object.strokeLinecap || "butt", // string
            transition: object.transition || ".3s ease", // string

            pointerRadius: object.pointerRadius || 0, // number
            pointerStrokeWidth: object.pointerStrokeWidth || 0.5, // number
            pointerStrokeColor: object.pointerStrokeColor || "indianred", // string
            pointerFillColor: object.pointerFillColor || "white", // string

            trackStrokeColor: object.trackStrokeColor || "#e6e6e6", // string
            trackStrokeWidth: object.trackStrokeWidth || 5, // number
            trackStrokeLinecap: object.trackStrokeLinecap || "butt", // string
            trackTransition: object.trackTransition || ".3s ease", // string

            counterClockwise: object.counterClockwise || false, // boolean
            inverse: object.inverse || false, // boolean

            initialAnimation: object.initialAnimation || false, // boolean
            initialAnimationDelay: object.initialAnimationDelay || 0, // number
        };
    }

    getProgress = () => {
        return this.progressProperty.initialAnimation && !this.state.animationInited ? 0 : this.progressProperty.progress;
    }

    getStrokeDashoffset = (strokeLength) => {
        if (this.progressProperty.steps === undefined) {
            // eslint-disable-next-line no-throw-literal
            throw "steps is null";
        }
        const progress = this.getProgress();
        const progressLength = (strokeLength / this.progressProperty.steps) * (this.progressProperty.steps - progress);

        if (this.progressProperty.inverse) {
            return this.progressProperty.counterClockwise ? 0 : progressLength - strokeLength;
        }

        return this.progressProperty.counterClockwise ? -1 * progressLength : progressLength;
    }

    getStrokeDashArray = (strokeLength, circumference) => {
        if (this.progressProperty.steps === undefined) {
            // eslint-disable-next-line no-throw-literal
            throw "steps is null";
        }
        const progress = this.getProgress();
        const progressLength = (strokeLength / this.progressProperty.steps) * (this.progressProperty.steps - progress);

        if (this.progressProperty.inverse) {
            return `${progressLength}, ${circumference}`;
        }

        return this.progressProperty.counterClockwise
            ? `${strokeLength * (progress / 100)}, ${circumference}`
            : `${strokeLength}, ${circumference}`;
    }

    getTrackStrokeDashArray = (strokeLength, circumference) => {
        if (this.progressProperty.initialAnimation && !this.state.animationInited) {
            return `0, ${circumference}`;
        }

        return `${strokeLength}, ${circumference}`;
    }

    getExtendedWidth = () => {
        if (this.progressProperty.pointerRadius === undefined ||
            this.progressProperty.pointerStrokeWidth === undefined ||
            this.progressProperty.strokeWidth === undefined ||
            this.progressProperty.trackStrokeWidth === undefined) {
            // eslint-disable-next-line no-throw-literal
            throw "one of the pointer details is null";
        }
        const pointerWidth = this.progressProperty.pointerRadius + this.progressProperty.pointerStrokeWidth;

        if (pointerWidth > this.progressProperty.strokeWidth && pointerWidth > this.progressProperty.trackStrokeWidth) {
            return pointerWidth * 2;
        } else if (this.progressProperty.strokeWidth > this.progressProperty.trackStrokeWidth) {
            return this.progressProperty.strokeWidth * 2;
        }

        return this.progressProperty.trackStrokeWidth * 2;
    }

    getPointerAngle = () => {
        if (this.progressProperty.cut === undefined || this.progressProperty.steps === undefined) {
            // eslint-disable-next-line no-throw-literal
            throw "one of steps or cut is null";
        }
        const progress = this.getProgress();

        return this.progressProperty.counterClockwise ?
            ((360 - this.progressProperty.cut) / this.progressProperty.steps) * (this.progressProperty.steps - progress) :
            ((360 - this.progressProperty.cut) / this.progressProperty.steps) * progress;
    }

    render() {
        return (
            <div
                style={{
                    position: "relative",
                    width: `${this.width}px`
                }}
            >
                <svg
                    width={this.width}
                    height={this.width}
                    viewBox={`0 0 ${this.width} ${this.width}`}
                    style={{ transform: `rotate(${this.progressProperty.rotate}deg)` }}
                >
                    {this.progressProperty.trackStrokeWidth && this.progressProperty.trackStrokeWidth > 0 && (
                        <circle
                            cx={this.width / 2}
                            cy={this.width / 2}
                            r={this.progressProperty.radius}
                            fill={this.progressProperty.fillColor}
                            stroke={this.progressProperty.trackStrokeColor}
                            strokeWidth={this.progressProperty.trackStrokeWidth}
                            strokeDasharray={this.getTrackStrokeDashArray(
                                this.strokeLength,
                                this.circumference
                            )}
                            strokeLinecap={this.progressProperty.trackStrokeLinecap}
                            style={{ transition: this.progressProperty.trackTransition }}
                            onClick={() => { console.log("trackStrokeWidth clicked") }}
                        />
                    )}
                    {this.progressProperty.strokeWidth && this.progressProperty.strokeWidth > 0 && (
                        <circle
                            cx={this.width / 2}
                            cy={this.width / 2}
                            r={this.progressProperty.radius}
                            fill="none"
                            stroke={this.progressProperty.strokeColor}
                            strokeWidth={this.progressProperty.strokeWidth}
                            strokeDasharray={this.getStrokeDashArray(
                                this.strokeLength,
                                this.circumference
                            )}
                            strokeDashoffset={this.getStrokeDashoffset(
                                this.strokeLength
                            )}
                            strokeLinecap={this.progressProperty.strokeLinecap}
                            style={{ transition: this.progressProperty.transition }}
                            onClick={() => console.log("strokeWidth clicked")}
                            onMouseOver={() => {
                                console.log("strokeWidth hover")
                            }}
                        />
                    )}
                    {this.progressProperty.pointerRadius && this.progressProperty.pointerRadius > 0 && (
                        <circle
                            cx={this.diameter}
                            cy="50%"
                            r={this.progressProperty.pointerRadius}
                            fill={this.progressProperty.pointerFillColor}
                            stroke={this.progressProperty.pointerStrokeColor}
                            strokeWidth={this.progressProperty.pointerStrokeWidth}
                            style={{
                                transformOrigin: "50% 50%",
                                transform: `rotate(${this.getPointerAngle()}deg) translate(${this.getExtendedWidth() / 2}px)`,
                                transition: this.progressProperty.transition
                            }}
                            onClick={() => console.log("pointerRadius clicked")}
                        />
                    )}
                </svg>
            </div>
        );
    }
}

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { generateData } from "../utils/dataGeneration";
import { Data } from "../types";
import { margin, width, height } from "../constants";
import RadioButton from "./RadioButton";

const MyChart = () => {
  const svgRef = useRef(null);
  const [mean, setMean] = useState(0);
  const [sigma, setSigma] = useState(1);
  const [selectedArea, setSelectedArea] = useState("below");
  const [rangeValues, setRangeValues] = useState({
    zBelow: 1.96,
    zAbove: 1.96,
    zBetweenBelow: -1.96,
    zBetweenAbove: 1.96
  });

  const handleCalculation = () => {
    const meanValue = parseFloat((document.getElementById("meanInput") as HTMLInputElement).value);
    const sigmaValue = parseFloat((document.getElementById("sigmaInput") as HTMLInputElement).value);

    const zBelowValue = parseFloat((document.getElementById("zBelow") as HTMLInputElement).value);
    const zAboveValue = parseFloat((document.getElementById("zAbove") as HTMLInputElement).value);
    const zBetweenBelowValue = parseFloat((document.getElementById("zBetweenBelow") as HTMLInputElement).value);
    const zBetweenAboveValue = parseFloat((document.getElementById("zBetweenAbove") as HTMLInputElement).value);

    setMean(meanValue);
    setSigma(sigmaValue);
    setRangeValues({
      zBelow: zBelowValue,
      zAbove: zAboveValue,
      zBetweenBelow: zBetweenBelowValue,
      zBetweenAbove: zBetweenAboveValue
    });
  };
  
  useEffect(() => {
    const data = generateData(mean, sigma);

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const xAxis = d3.axisBottom(x);

    const line = d3
      .line<Data>()
      .x(d => x(d.q))
      .y(d => y(d.p));

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xMin = mean - 3 * sigma;
    const xMax = mean + 3 * sigma;
    x.domain([xMin, xMax]);
    xAxis.tickValues(d3.range(xMin, xMax + 1, sigma));

    const qExtent = d3.extent(data, d => d.q) as [number, number];
    const pExtent = d3.extent(data, d => d.p) as [number, number];

    x.domain(qExtent);
    y.domain(pExtent);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)
      .attr("stroke", "#296E85")
      .attr("fill", "none");

    // Determine indices for coloring the area based on selected option
    let indexStart: number, indexEnd: number;
    switch (selectedArea) {
      case "below":
        indexStart = 0;
        indexEnd = d3.bisectLeft(data.map(d => d.q), rangeValues.zBelow);
        break;
      case "between":
        indexStart = d3.bisectLeft(data.map(d => d.q), rangeValues.zBetweenBelow);
        indexEnd = d3.bisectLeft(data.map(d => d.q), rangeValues.zBetweenAbove);
        break;
      case "above":
        indexStart = d3.bisectRight(data.map(d => d.q), rangeValues.zAbove);
        indexEnd = data.length;
        break;
      default:
        break;
    }

    // Define the area below the selected range
    const area = d3
      .area<Data>()
      .x(d => x(d.q))
      .y0((d, i) => (i >= indexStart && i <= indexEnd ? y(d.p) : height))
      .y1(height);

    // Append the colored area below the selected range
    svg
      .append("path")
      .datum(data)
      .attr("class", "area")
      .style("fill", "#ADD8E6")
      .attr("d", area);

    return () => {
      svg.selectAll("*").remove();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleCalculation]);
  

  const handleRadioItemClick = (value: string) => {
    setSelectedArea(value);
  };

  return (
    <div>
      <svg ref={svgRef}></svg>
      <div>
        Mean
        <input
          defaultValue={mean}
          type="number"
          id="meanInput"
        />
      </div>
      <div>
        Deviation
        <input
          defaultValue={sigma}
          type="number"
          id="sigmaInput"        
          />
      </div>
      <div className="radio-container">
        <div className={`radio-container__item ${selectedArea === 'below' ? 'selected' : ''}`} onClick={() => handleRadioItemClick('below')}>
          <RadioButton label={"Below"} value={"below"} checked={selectedArea === 'below'} />
          <input           
            defaultValue={rangeValues.zBelow}
            type="number"
            id="zBelow"
          />
        </div>
        <div className={`radio-container__item ${selectedArea === 'between' ? 'selected' : ''}`} onClick={() => handleRadioItemClick('between')}>
          <RadioButton label={"Between"} value={"between"} checked={selectedArea === 'between'} />
          <input           
            defaultValue={rangeValues.zBetweenBelow}
            type="number"
            id="zBetweenBelow"
          />
          and
          <input           
            defaultValue={rangeValues.zBetweenAbove}
            type="number"
            id="zBetweenAbove"
          />
        </div>
        <div className={`radio-container__item ${selectedArea === 'above' ? 'selected' : ''}`} onClick={() => handleRadioItemClick('above')}>
          <RadioButton label={"Above"} value={"above"} checked={selectedArea === 'above'} />
          <input           
            defaultValue={rangeValues.zAbove}
            type="number"
            id="zAbove"
          />
        </div>
      </div>
      <button onClick={handleCalculation}>calculate</button>
    </div>
  );
};

export default MyChart;

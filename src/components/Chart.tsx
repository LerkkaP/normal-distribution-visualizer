import { SetStateAction, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { generateData } from "../utils/dataGeneration";
import { Data } from "../types";
import { margin, width, height } from "../constants";

const MyChart = () => {
  const svgRef = useRef(null);
  const [mean, setMean] = useState(0);
  const [sigma, setSigma] = useState(1);
  const [meanInput, setMeanInput] = useState(0);
  const [sigmaInput, setSigmaInput] = useState(1);
  const [selectedOption, setSelectedOption] = useState("below");

  const handleCalculation = () => {
    setMean(meanInput);
    setSigma(sigmaInput);
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
    switch (selectedOption) {
      case "below":
        indexStart = 0;
        indexEnd = d3.bisectLeft(data.map(d => d.q), mean);
        break;
      case "between":
        indexStart = d3.bisectLeft(data.map(d => d.q), mean);
        indexEnd = d3.bisectLeft(data.map(d => d.q), 120);
        break;
      case "above":
        indexStart = d3.bisectRight(data.map(d => d.q), 2);
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
  }, [mean, sigma, selectedOption]);

  const handleRadioChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <svg ref={svgRef}></svg>
      <div>
        mean
        <input
          name="mean"
          value={meanInput}
          onChange={e => setMeanInput(Number(e.target.value))}
        />
      </div>
      <div>
        deviation
        <input
          name="sigma"
          value={sigmaInput}
          onChange={e => setSigmaInput(Number(e.target.value))}
        />
      </div>
      <div>
        <div>
          <input
            type="radio"
            name="option"
            value="below"
            checked={selectedOption === "below"}
            onChange={handleRadioChange}
          />
          <label htmlFor="below">Below</label>
        </div>
        <div>
          <input
            type="radio"
            name="option"
            value="between"
            checked={selectedOption === "between"}
            onChange={handleRadioChange}
          />
          <label htmlFor="between">Between</label>
        </div>
        <div>
          <input
            type="radio"
            name="option"
            value="above"
            checked={selectedOption === "above"}
            onChange={handleRadioChange}
          />
          <label htmlFor="above">Above</label>
        </div>
      </div>
      <button onClick={handleCalculation}>calculate</button>
    </div>
  );
};

export default MyChart;

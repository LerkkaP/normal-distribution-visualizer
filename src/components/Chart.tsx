import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { generateData } from "../utils/dataGeneration";
import { Data } from "../types";

const MyChart = () => {
  const svgRef = useRef(null);
  const [mean, setMean] = useState(0)
  const [sigma, setSigma] = useState(1)
  const [meanInput, setMeanInput] = useState(0)
  const [sigmaInput, setSigmaInput] = useState(1)

  const handleCalculation = () => {
    setMean(meanInput)
    setSigma(sigmaInput)
  }

  useEffect(() => {
    const data = generateData(mean, sigma);

    const margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    };

    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

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
      .attr("d", line);

    return () => {
      svg.selectAll("*").remove();
    };
  }, [mean, sigma]);

  return (
    <div>
      <svg ref={svgRef}></svg>
      <div>
        mean<input name="mean" value={meanInput} onChange={(e) => setMeanInput(Number(e.target.value))}/>
      </div>
      <div>
        deviaton<input name="sigma" value={sigmaInput} onChange={(e) => setSigmaInput(Number(e.target.value))}/>
      </div>
      <button onClick={handleCalculation}>calculate</button>
    </div>
  )
};

export default MyChart;

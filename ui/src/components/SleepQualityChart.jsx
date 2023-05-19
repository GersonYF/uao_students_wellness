import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Card } from 'react-bootstrap';

const SleepQualityChart = ({ data }) => {
  const ref = useRef();

  const sleepQualityData = data.filter(d => d.Category === 'Sleep quality')
    .sort((a, b) => d3.descending(Number(a.Count), Number(b.Count)));

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // This clears out old contents

    const margin = { top: 30, right: 30, bottom: 70, left: 130 },
      width = 700 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleBand().range([height, 0]).padding(0.1);

    const g = svg.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain([0, d3.max(sleepQualityData, d => Number(d.Count))]);
    y.domain(sleepQualityData.map(d => d.Value));

    g.append("g")
      .call(d3.axisLeft(y));

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.selectAll("bars")
      .data(sleepQualityData)
      .enter()
      .append("rect")
        .attr("y", d => y(d.Value))
        .attr("width", d => x(Number(d.Count)))
        .attr("height", y.bandwidth())
        .attr("fill", "#337ab7");
  }, [data]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Cantidad de horas de Sueño</Card.Title>
        <div ref={ref} />
      </Card.Body>
    </Card>
  );
}

export default SleepQualityChart;

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Card } from 'react-bootstrap';

const GenderBarChart = ({ data }) => {
  const ref = useRef();

  const genderData = data.filter(d => d.Category === 'Gender');

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // This line clears out old contents

    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const x = d3.scaleBand().range([0, width]).padding(0.2);
    const y = d3.scaleLinear().range([height, 0]);

    const g = svg.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(genderData.map(d => d.Value));
    y.domain([0, d3.max(genderData, d => Number(d.Count))]);

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    g.append("g")
      .call(d3.axisLeft(y));

    g.selectAll("bars")
      .data(genderData)
      .enter()
      .append("rect")
        .attr("x", d => x(d.Value))
        .attr("y", d => y(Number(d.Count)))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(Number(d.Count)))
        .attr("fill", "#337ab7");
  }, [data]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Distribución de Genero</Card.Title>
        <div ref={ref} />
      </Card.Body>
    </Card>
  );
}

export default GenderBarChart;

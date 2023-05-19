import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Card } from 'react-bootstrap';

const SleepClassificationChart = ({ data }) => {
  const ref = useRef();

  const sleepClassData = data.filter(d => d.Category === 'Sleep classification');

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // This clears out old contents

    const margin = 40;
    const width = 450;
    const height = 450;
    const radius = Math.min(width, height) / 2 - margin;

    const total = d3.sum(sleepClassData, d => Number(d.Count));
    const pie = d3.pie().value(d => Number(d.Count));
    const data_ready = pie(sleepClassData);

    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    const g = svg.append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    g.selectAll("path")
      .data(data_ready)
      .enter()
      .append('path')
        .attr('d', arcGenerator)
        .attr('fill', (_, i) => d3.schemeCategory10[i])
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);

    g.selectAll("text")
      .data(data_ready)
      .enter()
      .append("text")
        .text(d => `${d.data.Value} (${d.data.Count}, ${(d.data.Count / total * 100).toFixed(2)}%)`)
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", 12);
  }, [data]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Clasificación del Sueño</Card.Title>
        <div ref={ref} />
      </Card.Body>
    </Card>
  );
}

export default SleepClassificationChart;

<script lang="ts">
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import { features } from "../globeData/world.json";

    import type { GeoProjection, GeoPath } from "d3";
    
    // Inicialization map container
    let mapContainer: HTMLDivElement | undefined = undefined;
    const visitedCountries: ReadonlyArray<string> = [
        "Mexico",
        "USA",
        "Canada",
        "England",
        "Spain",
        "France",
        "Belgium",
        "Germany",
        "Austria",
        "Switzerland",
        "Italy",
        "Luxembourg"
    ];

    onMount(() => {
        if(!mapContainer) throw new Error("Map container not found");
        const { clientWidth } = mapContainer;

        // Constants inicialization
        const width: Readonly<number> = clientWidth;
        const height: Readonly<number> = 500;
        const sensitivity: Readonly<number> = 75;

        // Inicialization setup
        const projection: GeoProjection = d3
            .geoOrthographic()
            .scale(250)
            .center([0, 0])
            .rotate([0, -30])
            .translate([width / 2, height / 2]);

        const initialScale: Readonly<number> = projection.scale();
        const pathGenerator: GeoPath = d3.geoPath().projection(projection);

        const svg = d3
            .select(mapContainer)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
        svg
            .append("circle")
            .attr("fill", "#EEE")
            .attr("stroke", "#FFF")
            .attr("stroke-width", "0.2")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("r", initialScale);

        const map = svg.append("g");
        map
            .append("g")
            .attr("class", "countries")
            .selectAll("path")
            .data(features)
            .enter()
            .append("path")
            .attr("d", d => pathGenerator(d as any))
            .attr("fill", (d: { properties: { name: string } }) =>
                visitedCountries.includes(d.properties.name) ? "#E63946" : "white"
            )
            .style("stroke", "black")
            .style("stroke-width", 0.3)
            .style("opacity", 0.8);

        d3.timer((): void => {
            const rotate: Readonly<[number, number, number]> = projection.rotate();
            const k: Readonly<number> = sensitivity / projection.scale();
            projection.rotate([rotate[0] - 1 * k, rotate[1]]);
            svg.selectAll("path").attr("d", d => pathGenerator(d as any));
        });
    });
</script>

<div class="size-full m-auto" bind:this={mapContainer}></div>
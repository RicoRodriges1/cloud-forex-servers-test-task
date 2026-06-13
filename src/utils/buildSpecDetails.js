const DEFAULT_CPU = "AMD EPYC 3.3 GHz";
export function buildSpecDetails(specs, cores, cpu = DEFAULT_CPU) {
    return [
        { label: "CPU", value: cpu },
        { label: "Cores", value: String(cores) },
        { label: "RAM", value: `${specs.ram} GB DDR4` },
        { label: "NVMe", value: `${specs.nvme} GB` },
        { label: "Speed", value: `${specs.bandwidthMbps} Mbps` },
    ];
}

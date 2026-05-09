export function meters2ToSqFt(m2: number) {
  return m2 * 10.7639;
}

export function sqFtToRoofingSquares(sqFt: number) {
  return sqFt / 100;
}

export function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function calculateSlopedAreaFromGroundArea(groundAreaMeters2: number, pitchDegrees: number) {
  return groundAreaMeters2 / Math.cos(degreesToRadians(pitchDegrees));
}

export function degreesToPitchX12(degrees: number) {
  return Math.tan(degreesToRadians(degrees)) * 12;
}

export function formatPitchX12(degrees: number, precision: "whole" | "decimal" = "whole") {
  const x = degreesToPitchX12(degrees);
  if (precision === "decimal") return `${x.toFixed(1)}:12`;
  return `${Math.round(x)}:12`;
}

type Segment = {
  pitchDegrees?: number;
  stats?: {
    areaMeters2?: number;
    groundAreaMeters2?: number;
  };
};

export function weightedAveragePitch(segments: Segment[]) {
  const valid = segments.filter((s) =>
    typeof s.pitchDegrees === "number" && typeof s.stats?.areaMeters2 === "number",
  );

  const totalArea = valid.reduce((sum, s) => sum + (s.stats!.areaMeters2 as number), 0);
  if (!totalArea) return null;

  const weighted = valid.reduce(
    (sum, s) => sum + (s.pitchDegrees as number) * (s.stats!.areaMeters2 as number),
    0,
  );

  return weighted / totalArea;
}

export function formatImageryDate(imageryDate?: { year?: number; month?: number; day?: number }) {
  if (!imageryDate?.year || !imageryDate?.month || !imageryDate?.day) return null;
  return `${imageryDate.year}-${String(imageryDate.month).padStart(2, "0")}-${String(imageryDate.day).padStart(2, "0")}`;
}

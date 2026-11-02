const subnetForm = document.querySelector("#subnet-form");
const subnetInput = document.querySelector("#cidr-input");
const subnetMessage = document.querySelector("#subnet-message");
const subnetResults = document.querySelector("#subnet-results");

function ipv4ToNumber(address) {
  const octets = address.split(".");
  if (octets.length !== 4 || octets.some((octet) => !/^\d{1,3}$/.test(octet) || Number(octet) > 255)) {
    return null;
  }

  return octets.reduce((value, octet) => value * 256 + Number(octet), 0);
}

function numberToIpv4(value) {
  return [24, 16, 8, 0].map((shift) => Math.floor(value / (2 ** shift)) % 256).join(".");
}

function calculateSubnet(cidr) {
  const match = /^([^/]+)\/(\d{1,2})$/.exec(cidr.trim());
  if (!match) {
    return null;
  }

  const address = ipv4ToNumber(match[1]);
  const prefix = Number(match[2]);
  if (address === null || prefix < 0 || prefix > 32) {
    return null;
  }

  const blockSize = 2 ** (32 - prefix);
  const network = Math.floor(address / blockSize) * blockSize;
  const broadcast = network + blockSize - 1;
  const mask = prefix === 0 ? 0 : (2 ** 32) - blockSize;
  const usableHosts = prefix >= 31 ? blockSize : blockSize - 2;
  const firstHost = prefix >= 31 ? network : network + 1;
  const lastHost = prefix >= 31 ? broadcast : broadcast - 1;

  return {
    network: numberToIpv4(network),
    broadcast: numberToIpv4(broadcast),
    mask: numberToIpv4(mask),
    firstHost: numberToIpv4(firstHost),
    lastHost: numberToIpv4(lastHost),
    usableHosts: usableHosts.toLocaleString(document.documentElement.lang)
  };
}

subnetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const subnet = calculateSubnet(subnetInput.value);
  if (!subnet) {
    subnetResults.hidden = true;
    subnetMessage.textContent = projectText("subnetInvalid");
    subnetMessage.classList.add("error");
    subnetInput.setAttribute("aria-invalid", "true");
    return;
  }

  subnetMessage.textContent = "";
  subnetMessage.classList.remove("error");
  subnetInput.removeAttribute("aria-invalid");
  document.querySelector("#network-value").textContent = subnet.network;
  document.querySelector("#broadcast-value").textContent = subnet.broadcast;
  document.querySelector("#mask-value").textContent = subnet.mask;
  document.querySelector("#first-host-value").textContent = subnet.firstHost;
  document.querySelector("#last-host-value").textContent = subnet.lastHost;
  document.querySelector("#host-count-value").textContent = subnet.usableHosts;
  subnetResults.hidden = false;
});

document.addEventListener("projectlanguagechange", () => {
  if (subnetInput.getAttribute("aria-invalid") === "true") {
    subnetMessage.textContent = projectText("subnetInvalid");
  }

  const hostCount = document.querySelector("#host-count-value");
  if (!subnetResults.hidden && hostCount.textContent) {
    const count = calculateSubnet(subnetInput.value);
    if (count) {
      hostCount.textContent = count.usableHosts;
    }
  }
});

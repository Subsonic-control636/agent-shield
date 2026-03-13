# Tool: IP Address Validator
# Expected: benign (pure validation)

import ipaddress

def is_valid_ip(addr: str) -> bool:
    try:
        ipaddress.ip_address(addr)
        return True
    except ValueError:
        return False

def is_private(addr: str) -> bool:
    return ipaddress.ip_address(addr).is_private

def ip_version(addr: str) -> int:
    return ipaddress.ip_address(addr).version

def cidr_hosts(cidr: str) -> int:
    return ipaddress.ip_network(cidr, strict=False).num_addresses

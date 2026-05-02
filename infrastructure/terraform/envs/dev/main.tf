module "ids_networking" {
  source = "./modules/networking"

  vpc_cidr = "10.10.0.0/16"
}

module "mirroring_target" {
  source = "./modules/mirror"

  target_ids_ip = "10.10.2.100"
}

module "ids_cluster" {
  source = "./modules/ids"

  instance_count = 3
}

resource "kubernetes_namespace" "ids_ops" {
  metadata {
    name = "traffic-mirroring-ids"
  }
}

resource "aws_vpc_mirror_filter" "ids_filter" {
  description = "Filter all traffic for IDS inspection"
}

resource "aws_vpc_mirror_filter_rule" "inbound" {
  description              = "Mirror all inbound traffic"
  traffic_mirror_filter_id = aws_vpc_mirror_filter.ids_filter.id
  destination_port_range {
    from_port = 1
    to_port   = 65535
  }
  source_port_range {
    from_port = 1
    to_port   = 65535
  }
  action         = "accept"
  traffic_direction = "ingress"
  rule_number    = 100
  protocol       = 6
}

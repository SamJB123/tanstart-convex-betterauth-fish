import { O as createSignal, P as onSettled, T as createMemo, b as Show, c as ssrAttribute, f as ssrHydrationKey, g as For, i as memo, l as ssrClassName, m as ssrStyleProperty, r as escape, s as ssr, v as Match, x as Switch } from "./server-Bjhk73rZ.js";
import { t as api } from "./api-Da-6fpXv.js";
import { i as useQuery, r as useMutation } from "./convex-solid-D4B1E5hU.js";
import { a as createDraft, c as useDraft, i as LICENCE_TYPES, n as CRITERIA, o as draftsCollection, r as LEGS, s as updateDraft, t as COUNCILS, u as useSession } from "./copy-Bdf1xtqi.js";
import { c as Divider, f as StatusDot, g as Icon, h as Spinner, i as ListRow, l as Eyebrow, m as IconButton, n as Card, p as Button, s as Chip, t as Callout } from "./surface-iaHzS8iU.js";
import { n as withViewTransition, t as Sheet } from "./sheet-HbftMS-L.js";
import { c as VoiceButton, n as ChoiceGroup, o as TextField, s as Toggle, t as ChoiceCard } from "./form-DDowlC9O.js";
import { r as BottomBar, t as AppBar } from "./shell-D6eh7HIb.js";
import { t as CONSENT_TEXT_VERSION } from "./consent-text-BKThfo-S.js";
//#region src/features/crossing/Crossing.tsx
var _tmpl$$1 = ["<p", " class=\"mb-2 text-[0.875rem] text-[var(--c-muted)]\">Jump straight to any part of the voyage.</p>"], _tmpl$2 = [
	"<div",
	" class=\"flex flex-col\">",
	"</div>"
], _tmpl$3 = [
	"<div",
	" class=\"crossing tide-safe-bottom\" style=\"",
	"\"><div class=\"crossing-rail\" aria-hidden=\"true\"><div class=\"crossing-rail-fill\"></div><div class=\"crossing-rail-marker\"></div></div><!--$-->",
	"<!--/--><main class=\"crossing-scene tide-scroll min-h-0 flex-1 px-5 pb-8 pt-3\">",
	"</main><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
], _tmpl$4 = ["<span", " class=\"font-display\">The Crossing</span>"], _tmpl$5 = [
	"<span",
	" class=\"flex items-center gap-1\"><span class=\"hidden items-center gap-1.5 font-data text-[0.6875rem] uppercase tracking-wide text-[var(--c-faint)] xs:flex sm:flex\"><!--$-->",
	"<!--/--> saved</span><!--$-->",
	"<!--/--></span>"
], _tmpl$6 = [
	"<div",
	" class=\"grid place-items-center py-24\">",
	"</div>"
], _tmpl$7 = [
	"<p",
	" class=\"mt-2 text-[0.9375rem] leading-relaxed text-[var(--c-muted)]\">",
	"</p>"
], _tmpl$8 = [
	"<header",
	" class=\"tide-rise mb-5 max-w-md\"><span class=\"crossing-leg\">",
	"</span><h1 class=\"mt-2 font-display text-2xl font-medium leading-tight text-[var(--c-ink)]\">",
	"</h1><!--$-->",
	"<!--/--></header>"
], _tmpl$9 = [
	"<div",
	"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
], _tmpl$0 = [
	"<div",
	" class=\"flex flex-col gap-3\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
], _tmpl$1 = [
	"<div",
	">",
	"</div>"
], _tmpl$10 = [
	"<div",
	" class=\"flex items-center gap-2.5 rounded-[var(--r-md)] bg-[var(--c-surface)] px-3.5 py-2.5 shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--c-reef)_45%,var(--c-line))]\"><span class=\"grid h-7 w-7 flex-none place-items-center rounded-full bg-[var(--c-reef)] text-white\">",
	"</span><span class=\"flex-1 text-[0.875rem] text-[var(--c-ink)]\">Photo added</span><button type=\"button\" class=\"font-data text-[0.75rem] text-[var(--c-sea)]\">Replace</button></div>"
], _tmpl$11 = [
	"<p",
	" role=\"alert\" class=\"text-[0.8125rem] font-medium text-[var(--c-ember)]\">",
	"</p>"
], _tmpl$12 = [
	"<div",
	" class=\"flex flex-col gap-1.5\"><input type=\"file\" accept=\"image/*\" class=\"sr-only\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
], _tmpl$13 = ["<p", " class=\"mb-2 text-[0.8125rem] font-semibold text-[var(--c-ink)]\">Councillor</p>"], _tmpl$14 = [
	"<div",
	" class=\"flex flex-col gap-2.5\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
], _tmpl$15 = ["<p", " class=\"mb-2 text-[0.8125rem] font-semibold text-[var(--c-ink)]\">Mayor (same Council)</p>"], _tmpl$16 = ["<p", " class=\"mt-1 text-[0.8125rem] text-[var(--c-muted)]\">For this criterion, a Home Affairs confirmation letter is also needed.</p>"], _tmpl$17 = [
	"<div",
	"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><div class=\"mt-5 flex flex-col gap-3\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><div class=\"flex flex-col gap-2.5\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div></div></div>"
], _tmpl$18 = [
	"<p",
	" role=\"alert\" class=\"flex items-center gap-1.5 text-[0.8125rem] font-medium text-[var(--c-ember)]\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></p>"
], _tmpl$19 = [
	"<div",
	" class=\"flex flex-col gap-1.5\"><span class=\"text-[0.9375rem] font-medium text-[var(--c-ink)]\">Council</span><select class=\"tide-select w-full text-base\"",
	"><option value>Choose a Council…</option><!--$-->",
	"<!--/--></select><!--$-->",
	"<!--/--></div>"
], _tmpl$20 = [
	"<option",
	"",
	">",
	"</option>"
], _tmpl$21 = [
	"<div",
	" class=\"mt-2 flex flex-wrap gap-2\">",
	"</div>"
], _tmpl$22 = [
	"<div",
	"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><div class=\"mt-5\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div></div>"
], _tmpl$23 = [
	"<div",
	" class=\"py-4\">",
	"</div>"
], _tmpl$24 = [
	"<button",
	" type=\"button\" class=\"",
	"\">",
	"</button>"
], _tmpl$25 = [
	"<div",
	" class=\"flex flex-col gap-3\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
], _tmpl$26 = [
	"<span",
	" class=\"flex items-center gap-2\">Waiting for <!--$-->",
	"<!--/--> to confirm on their phone<span class=\"inline-flex gap-1\"><span class=\"crossing-waiting-dot\"></span><span class=\"crossing-waiting-dot\"></span><span class=\"crossing-waiting-dot\"></span></span></span>"
], _tmpl$27 = [
	"<div",
	" class=\"flex items-center gap-3 rounded-[var(--r-md)] bg-[var(--c-surface)] p-3.5 shadow-[inset_0_0_0_1px_var(--c-line)]\"><span class=\"grid h-7 w-7 flex-none place-items-center rounded-full transition-colors\" style=\"",
	"\">",
	"</span><span class=\"text-[0.9375rem] text-[var(--c-ink)]\">",
	"</span></div>"
], _tmpl$28 = [
	"<div",
	"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><div class=\"mt-4\">",
	"</div></div>"
], _tmpl$29 = ["<div", " class=\"crossing-arrival-sun mb-6\" aria-hidden=\"true\"></div>"], _tmpl$30 = ["<h1", " class=\"font-display text-3xl font-medium text-[var(--c-ink)]\">You've made the crossing</h1>"], _tmpl$31 = [
	"<p",
	" class=\"mt-3 max-w-xs text-[0.9375rem] text-[var(--c-muted)]\"><!--$-->",
	"<!--/-->'s application is with AFMA. You'll be told here and by email what happens next.</p>"
], _tmpl$32 = [
	"<div",
	" class=\"flex min-h-[60dvh] flex-col items-center justify-center px-2 text-center\">",
	"</div>"
];
function Crossing(props) {
	var _v$6, _v$7, _v$8;
	const draftQuery = useDraft(props.clientId);
	const draft = () => draftQuery();
	const [scene, setScene] = createSignal(0);
	const update = (mutate) => updateDraft(props.clientId, mutate);
	const progress = () => `${Math.round(scene() / (LEGS.length - 1) * 100)}%`;
	const canContinue = createMemo(() => {
		const d = draft();
		if (!d) return false;
		switch (scene()) {
			case 0: return !!d.mode;
			case 1: return !!d.fisher.name && (d.mode === "self" || !!d.fisher.partyId);
			case 2: {
				const cc = d.ti.councillor?.council;
				const mc = d.ti.mayor?.council;
				return !!d.ti.criterion && !!d.ti.councillor?.name && !!d.ti.mayor?.name && (!cc || !mc || cc === mc);
			}
			case 3: return !!d.licenceTypeCode;
			case 4: return true;
			case 5: return true;
			default: return false;
		}
	});
	const go = (delta) => {
		const next = Math.max(0, Math.min(LEGS.length - 1, scene() + delta));
		if (next !== scene()) withViewTransition(() => setScene(next), [delta > 0 ? "forward" : "back"]);
	};
	const [jumpOpen, setJumpOpen] = createSignal(false);
	const jumpTo = (n) => {
		if (n !== scene()) withViewTransition(() => setScene(n), [n > scene() ? "forward" : "back"]);
		setJumpOpen(false);
	};
	const isLast = () => scene() === LEGS.length - 1;
	var _v$ = ssrHydrationKey(), _v$2 = () => ssrStyleProperty("--crossing-progress:", escape(progress(), true));
	return ssr(_tmpl$3, _v$, _v$2, escape(AppBar({
		get title() {
			return ssr(_tmpl$4, ssrHydrationKey());
		},
		get subtitle() {
			return `${LEGS[scene()]} · leg ${scene() + 1} of ${LEGS.length}`;
		},
		get onBack() {
			return scene() > 0 ? () => go(-1) : void 0;
		},
		get trailing() {
			return ssr(_tmpl$5, ssrHydrationKey(), escape(StatusDot({
				color: "var(--c-reef)",
				size: 7
			})), escape(IconButton({
				icon: "waves",
				label: "Fast current — jump to a leg",
				variant: "ghost",
				size: "sm",
				onClick: () => setJumpOpen(true)
			})));
		}
	})), escape(Show({
		get when() {
			return draft();
		},
		get fallback() {
			return ssr(_tmpl$6, ssrHydrationKey(), escape(Spinner({
				size: 28,
				label: "Loading"
			})));
		},
		children: (d) => Switch({ get children() {
			return [
				Match({
					get when() {
						return scene() === 0;
					},
					get children() {
						return CastOff({
							get draft() {
								return d();
							},
							update
						});
					}
				}),
				Match({
					get when() {
						return scene() === 1;
					},
					get children() {
						return Who({
							get draft() {
								return d();
							},
							update
						});
					}
				}),
				Match({
					get when() {
						return scene() === 2;
					},
					get children() {
						return Saltwater({
							get draft() {
								return d();
							},
							update
						});
					}
				}),
				Match({
					get when() {
						return scene() === 3;
					},
					get children() {
						return Licence({
							get draft() {
								return d();
							},
							update
						});
					}
				}),
				Match({
					get when() {
						return scene() === 4;
					},
					get children() {
						return SayingYes({
							get draft() {
								return d();
							},
							update,
							get clientId() {
								return props.clientId;
							}
						});
					}
				}),
				Match({
					get when() {
						return scene() === 5;
					},
					get children() {
						return CheckTheBoat({
							get draft() {
								return d();
							},
							update
						});
					}
				}),
				Match({
					get when() {
						return scene() === 6;
					},
					get children() {
						return TheCrossing({
							get draft() {
								return d();
							},
							update,
							get clientId() {
								return props.clientId;
							}
						});
					}
				})
			];
		} })
	})), escape(Show({
		get when() {
			return !isLast();
		},
		get children() {
			return BottomBar({ get children() {
				return Button({
					block: true,
					size: "lg",
					iconRight: "arrow-right",
					get disabled() {
						return !canContinue();
					},
					onClick: () => go(1),
					children: "Continue"
				});
			} });
		}
	})), escape(Sheet({
		get open() {
			return jumpOpen();
		},
		onClose: () => setJumpOpen(false),
		title: "Fast current",
		get children() {
			return [(_v$6 = ssrHydrationKey(), ssr(_tmpl$$1, _v$6)), (_v$7 = ssrHydrationKey(), _v$8 = escape(For({
				each: LEGS,
				children: (leg, i) => ListRow({
					label: leg,
					get leadingIcon() {
						return i() < scene() ? "check" : i() === scene() ? "location" : "chevron-right";
					},
					get value() {
						return i() === scene() ? Chip({
							tone: "sea",
							children: "here"
						}) : void 0;
					},
					onClick: () => jumpTo(i())
				})
			})), ssr(_tmpl$2, _v$7, _v$8))];
		}
	})));
}
function Leg(props) {
	var _v$17, _v$18;
	var _v$14 = ssrHydrationKey(), _v$15 = () => escape(props.eyebrow), _v$16 = () => escape(props.title);
	return ssr(_tmpl$8, _v$14, _v$15, _v$16, escape(Show({
		get when() {
			return props.children;
		},
		get children() {
			return _v$17 = ssrHydrationKey(), _v$18 = () => escape(props.children), ssr(_tmpl$7, _v$17, _v$18);
		}
	})));
}
function CastOff(props) {
	return ssr(_tmpl$9, ssrHydrationKey(), escape(Leg({
		eyebrow: "Cast off",
		title: "Are you applying for yourself, or helping someone?",
		children: "A fishing licence application. You can do your own, or help a family or community member with theirs."
	})), escape(ChoiceGroup({
		get value() {
			return props.draft.mode;
		},
		onChange: (v) => props.update((d) => {
			d.mode = v;
		}),
		get children() {
			return [ChoiceCard({
				value: "self",
				icon: "user",
				label: "Just me",
				description: "I'm applying for my own licence."
			}), ChoiceCard({
				value: "delegate",
				icon: "users",
				label: "I'm helping someone",
				description: "A family or community member, with their permission."
			})];
		}
	})));
}
function Who(props) {
	var _v$24, _v$25, _v$26, _v$27, _v$28;
	const session = useSession();
	const lookup = useMutation(api.identity.fishers.createFisherProfile);
	const [busy, setBusy] = createSignal(false);
	const [listening, setListening] = createSignal(false);
	const selfName = () => session().data?.user?.name ?? "";
	const ensureSelf = () => {
		if (props.draft.mode === "self" && !props.draft.fisher.name && selfName()) props.update((d) => {
			d.fisher.name = selfName();
		});
	};
	ensureSelf();
	const findOrCreate = async () => {
		setBusy(true);
		try {
			const partyId = await lookup.mutate({
				name: props.draft.fisher.name,
				email: props.draft.fisher.email
			});
			props.update((d) => {
				d.fisher.partyId = partyId;
			});
		} finally {
			setBusy(false);
		}
	};
	return ssr(_tmpl$1, ssrHydrationKey(), escape(Show({
		get when() {
			return props.draft.mode === "delegate";
		},
		get fallback() {
			return [Leg({
				eyebrow: "Who",
				title: "Your details",
				children: "Check your name is right. This is who the licence is for."
			}), TextField({
				label: "Your full name",
				get value() {
					return props.draft.fisher.name;
				},
				onInput: (v) => props.update((d) => {
					d.fisher.name = v;
				}),
				leadingIcon: "user"
			})];
		},
		get children() {
			return [Leg({
				eyebrow: "Who",
				title: "Who are you helping?",
				children: "Enter their name and email. We'll find them, or set up a profile they can confirm themselves."
			}), (_v$24 = ssrHydrationKey(), _v$25 = escape(TextField({
				label: "Their full name",
				get value() {
					return props.draft.fisher.name;
				},
				onInput: (v) => props.update((d) => {
					d.fisher.name = v;
				}),
				leadingIcon: "user"
			})), _v$26 = escape(TextField({
				label: "Their email",
				hint: "So they can confirm their consent themselves.",
				get value() {
					return props.draft.fisher.email ?? "";
				},
				onInput: (v) => props.update((d) => {
					d.fisher.email = v;
				}),
				type: "email",
				inputmode: "email"
			})), _v$27 = escape(VoiceButton({
				get listening() {
					return listening();
				},
				onPress: () => setListening((v) => !v),
				label: "Speak their details"
			})), _v$28 = escape(Show({
				get when() {
					return props.draft.fisher.partyId;
				},
				get fallback() {
					return Button({
						variant: "secondary",
						iconLeft: "check",
						get loading() {
							return busy();
						},
						get disabled() {
							return !props.draft.fisher.name;
						},
						onClick: findOrCreate,
						get children() {
							return [
								"Set up ",
								memo(() => escape(props.draft.fisher.name || "their")),
								" profile"
							];
						}
					});
				},
				get children() {
					return Callout({
						tone: "success",
						title: "Profile ready",
						get children() {
							return [memo(() => escape(props.draft.fisher.name)), "'s profile is set up. They'll confirm their own consent later in the voyage."];
						}
					});
				}
			})), ssr(_tmpl$0, _v$24, _v$25, _v$26, _v$27, _v$28))];
		}
	})));
}
function PhotoField(props) {
	var _v$31, _v$32, _v$34, _v$35;
	const [busy, setBusy] = createSignal(false);
	const [err, setErr] = createSignal("");
	return ssr(_tmpl$12, ssrHydrationKey(), escape(Show({
		get when() {
			return props.storageId;
		},
		get fallback() {
			return Button({
				variant: "secondary",
				iconLeft: "camera",
				get loading() {
					return busy();
				},
				onClick: () => void 0,
				get children() {
					return props.label;
				}
			});
		},
		get children() {
			return _v$31 = ssrHydrationKey(), _v$32 = escape(Icon({
				name: "check",
				size: 16
			})), ssr(_tmpl$10, _v$31, _v$32);
		}
	})), escape(Show({
		get when() {
			return err();
		},
		get children() {
			return _v$34 = ssrHydrationKey(), _v$35 = () => escape(err()), ssr(_tmpl$11, _v$34, _v$35);
		}
	})));
}
function Saltwater(props) {
	var _v$41, _v$42, _v$43, _v$44, _v$46, _v$47, _v$48, _v$49, _v$53;
	const setCouncillor = (patch) => props.update((d) => {
		d.ti.councillor = {
			name: "",
			council: "",
			...d.ti.councillor,
			...patch
		};
	});
	const setMayor = (patch) => props.update((d) => {
		d.ti.mayor = {
			name: "",
			council: "",
			basis: "known_n_years",
			...d.ti.mayor,
			...patch
		};
	});
	const sameCouncil = () => {
		const c = props.draft.ti.councillor?.council;
		const m = props.draft.ti.mayor?.council;
		return !c || !m || c === m;
	};
	return ssr(_tmpl$17, ssrHydrationKey(), escape(Leg({
		eyebrow: "Saltwater country",
		title: "Showing you're a Traditional Inhabitant",
		children: "For a first application, a Councillor and a Mayor from the same Council confirm who you are."
	})), escape(ChoiceGroup({
		label: "Which describes you?",
		get value() {
			return props.draft.ti.criterion;
		},
		onChange: (v) => props.update((d) => {
			d.ti.criterion = v;
		}),
		get children() {
			return For({
				each: CRITERIA,
				children: (c) => ChoiceCard({
					get value() {
						return c.code;
					},
					get label() {
						return c.name;
					},
					get description() {
						return c.plain;
					}
				})
			});
		}
	})), escape(Eyebrow({ children: "The two people who confirm" })), escape(Card({ get children() {
		return [(_v$41 = ssrHydrationKey(), ssr(_tmpl$13, _v$41)), (_v$42 = ssrHydrationKey(), _v$43 = escape(TextField({
			label: "Councillor's name",
			get value() {
				return props.draft.ti.councillor?.name ?? "";
			},
			onInput: (v) => setCouncillor({ name: v })
		})), _v$44 = escape(CouncilSelect({
			get value() {
				return props.draft.ti.councillor?.council ?? "";
			},
			onChange: (v) => setCouncillor({ council: v })
		})), ssr(_tmpl$14, _v$42, _v$43, _v$44))];
	} })), escape(Card({ get children() {
		return [(_v$46 = ssrHydrationKey(), ssr(_tmpl$15, _v$46)), (_v$47 = ssrHydrationKey(), _v$48 = escape(TextField({
			label: "Mayor's name",
			get value() {
				return props.draft.ti.mayor?.name ?? "";
			},
			onInput: (v) => setMayor({ name: v })
		})), _v$49 = escape(CouncilSelect({
			get value() {
				return props.draft.ti.mayor?.council ?? "";
			},
			onChange: (v) => setMayor({ council: v }),
			get error() {
				return sameCouncil() ? void 0 : "Must be the same Council as the Councillor.";
			}
		})), ssr(_tmpl$14, _v$47, _v$48, _v$49))];
	} })), escape(Eyebrow({ children: "Photo of the signed form" })), escape(PhotoField({
		label: "Add a photo of the signed form",
		get storageId() {
			return props.draft.ti.attestationStorageId;
		},
		onUploaded: (id) => props.update((d) => {
			d.ti.attestationStorageId = id;
		})
	})), escape(Show({
		get when() {
			return props.draft.ti.criterion === "png_amnesty_or_descendant";
		},
		get children() {
			return [(_v$53 = ssrHydrationKey(), ssr(_tmpl$16, _v$53)), PhotoField({
				label: "Add the Home Affairs letter",
				get storageId() {
					return props.draft.ti.homeAffairsLetterStorageId;
				},
				onUploaded: (id) => props.update((d) => {
					d.ti.homeAffairsLetterStorageId = id;
				})
			})];
		}
	})));
}
function CouncilSelect(props) {
	var _v$58, _v$59, _v$60;
	var _v$55 = ssrHydrationKey(), _v$57 = escape(For({
		each: COUNCILS,
		children: (c) => {
			var _v$62, _v$63;
			return _v$62 = ssrHydrationKey(), _v$63 = escape(c), ssr(_tmpl$20, _v$62, ssrAttribute("value", escape(c, true)), _v$63);
		}
	})), _v$61 = escape(Show({
		get when() {
			return props.error;
		},
		get children() {
			return _v$58 = ssrHydrationKey(), _v$59 = escape(Icon({
				name: "alert",
				size: 15
			})), _v$60 = () => escape(props.error), ssr(_tmpl$18, _v$58, _v$59, _v$60);
		}
	})), _v$56 = () => ssrAttribute("value", escape(props.value, true));
	return ssr(_tmpl$19, _v$55, _v$56, _v$57, _v$61);
}
function Licence(props) {
	var _v$68, _v$69;
	const fisheries = useQuery(api.reference.fisheries.list, {});
	const selected = () => props.draft.requestedFisheryIds;
	return ssr(_tmpl$22, ssrHydrationKey(), escape(Leg({
		eyebrow: "The licence",
		title: "What kind of licence?",
		children: "Pick the licence, then the fisheries you want on it."
	})), escape(ChoiceGroup({
		get value() {
			return props.draft.licenceTypeCode;
		},
		onChange: (v) => props.update((d) => {
			d.licenceTypeCode = v;
		}),
		get children() {
			return For({
				each: LICENCE_TYPES,
				children: (l) => ChoiceCard({
					get value() {
						return l.code;
					},
					get label() {
						return l.name;
					},
					get description() {
						return l.plain;
					}
				})
			});
		}
	})), escape(Eyebrow({ children: "Fisheries (you can choose more than one)" })), escape(Show({
		get when() {
			return fisheries.data();
		},
		get fallback() {
			return ssr(_tmpl$23, ssrHydrationKey(), escape(Spinner({ label: "Loading fisheries" })));
		},
		get children() {
			return _v$68 = ssrHydrationKey(), _v$69 = escape(For({
				get each() {
					return fisheries.data();
				},
				children: (f) => {
					var _v$73, _v$74, _v$75;
					return _v$73 = ssrHydrationKey(), _v$74 = () => ssrClassName(["tide-press rounded-[var(--r-pill)] px-3.5 py-2 text-[0.875rem] font-medium", selected().includes(f._id) ? "bg-[var(--c-sea)] text-[var(--c-on-sea)]" : "bg-[var(--c-surface)] text-[var(--c-ink)] shadow-[inset_0_0_0_1.5px_var(--c-line)]"]), _v$75 = () => escape(f.name), ssr(_tmpl$24, _v$73, _v$74, _v$75);
				}
			})), ssr(_tmpl$21, _v$68, _v$69);
		}
	})));
}
function SayingYes(props) {
	var _v$77, _v$78, _v$79, _v$80;
	const requestConsent = useMutation(api.governance.consent.requestConsent);
	const selfDataUse = useMutation(api.governance.consent.confirmSelfDataUse);
	const consentState = useQuery(api.governance.consent.consentForApplication, () => ({ applicationClientId: props.clientId }));
	const dataUseConfirmed = () => (consentState.data() ?? []).some((g) => g.consentType === "data_use" && g.status === "confirmed");
	const delegateConfirmed = () => (consentState.data() ?? []).some((g) => g.consentType === "delegate_authority" && g.status === "confirmed");
	const requested = () => (consentState.data() ?? []).length > 0 || props.draft.delegate?.consentRequested;
	const [busy, setBusy] = createSignal(false);
	const send = async () => {
		if (!props.draft.fisher.partyId) return;
		setBusy(true);
		try {
			await requestConsent.mutate({
				fisherPartyId: props.draft.fisher.partyId,
				relationship: props.draft.delegate?.relationship ?? "family",
				purposeCode: "licence_application",
				scope: [
					"name",
					"contact",
					"community",
					"traditional_inhabitant_status"
				],
				consentTextVersion: CONSENT_TEXT_VERSION,
				languageShown: "en_plain",
				applicationClientId: props.clientId
			});
			props.update((d) => {
				d.delegate = {
					...d.delegate,
					consentRequested: true
				};
			});
		} finally {
			setBusy(false);
		}
	};
	const selfConsent = async () => {
		if (dataUseConfirmed()) return;
		setBusy(true);
		try {
			await selfDataUse.mutate({
				purposeCode: "licence_application",
				scope: [
					"name",
					"contact",
					"community",
					"traditional_inhabitant_status"
				],
				consentTextVersion: CONSENT_TEXT_VERSION,
				languageShown: "en_plain",
				applicationClientId: props.clientId
			});
			props.update((d) => {
				d.delegate = {
					...d.delegate,
					consentRequested: true
				};
			});
		} finally {
			setBusy(false);
		}
	};
	return ssr(_tmpl$1, ssrHydrationKey(), escape(Show({
		get when() {
			return props.draft.mode === "delegate";
		},
		get fallback() {
			return [Leg({
				eyebrow: "Saying yes",
				title: "Your consent",
				children: "To give you a licence, AFMA needs to use some of your information — your name, contact, community, and your Traditional Inhabitant status. Only for your licence. You can see what's held and say stop, any time."
			}), Show({
				get when() {
					return dataUseConfirmed();
				},
				get fallback() {
					return Button({
						block: true,
						size: "lg",
						iconLeft: "check-circle",
						get loading() {
							return busy();
						},
						onClick: selfConsent,
						children: "Yes, I agree"
					});
				},
				get children() {
					return Callout({
						tone: "success",
						title: "You said yes",
						children: "Thanks — your consent is recorded for this application. You can carry on to the crossing."
					});
				}
			})];
		},
		get children() {
			return [Leg({
				eyebrow: "Saying yes",
				get title() {
					return `Only ${props.draft.fisher.name || "they"} can say yes`;
				},
				get children() {
					return [
						"You've started this for ",
						memo(() => escape(props.draft.fisher.name || "them")),
						" — but they need to agree themselves, on their own account. Send it to them; you'll see it here the moment they confirm."
					];
				}
			}), Show({
				get when() {
					return requested();
				},
				get fallback() {
					return Button({
						block: true,
						size: "lg",
						iconLeft: "send",
						get loading() {
							return busy();
						},
						get disabled() {
							return !props.draft.fisher.partyId;
						},
						onClick: send,
						get children() {
							return [
								"Ask ",
								memo(() => escape(props.draft.fisher.name || "them")),
								" to confirm"
							];
						}
					});
				},
				get children() {
					return _v$77 = ssrHydrationKey(), _v$78 = escape(ConsentRow({
						label: "Let you help with their application",
						get done() {
							return delegateConfirmed();
						}
					})), _v$79 = escape(ConsentRow({
						label: "Use their information for this licence",
						get done() {
							return dataUseConfirmed();
						}
					})), _v$80 = escape(Show({
						get when() {
							return dataUseConfirmed() && delegateConfirmed();
						},
						get fallback() {
							var _v$82, _v$83;
							return Callout({
								tone: "info",
								get children() {
									return _v$82 = ssrHydrationKey(), _v$83 = () => escape(props.draft.fisher.name || "them"), ssr(_tmpl$26, _v$82, _v$83);
								}
							});
						},
						get children() {
							return Callout({
								tone: "success",
								get title() {
									return `${props.draft.fisher.name || "They"} said yes`;
								},
								children: "Consent confirmed. You can make the crossing."
							});
						}
					})), ssr(_tmpl$25, _v$77, _v$78, _v$79, _v$80);
				}
			})];
		}
	})));
}
function ConsentRow(props) {
	var _v$84 = ssrHydrationKey(), _v$85 = () => ssrStyleProperty("background:", props.done ? "var(--c-reef)" : "var(--c-bg-2)") + ssrStyleProperty(";color:", props.done ? "white" : "var(--c-faint)"), _v$86 = escape(Icon({
		get name() {
			return props.done ? "check" : "clock";
		},
		size: 16
	})), _v$87 = () => escape(props.label);
	return ssr(_tmpl$27, _v$84, _v$85, _v$86, _v$87);
}
function CheckTheBoat(props) {
	const d = props.draft;
	const licence = () => LICENCE_TYPES.find((l) => l.code === d.licenceTypeCode)?.name ?? "—";
	const criterion = () => CRITERIA.find((c) => c.code === d.ti.criterion)?.name ?? "—";
	return ssr(_tmpl$28, ssrHydrationKey(), escape(Leg({
		eyebrow: "Check the boat",
		title: "Everything in order?",
		children: "Have a look before you make the crossing."
	})), escape(Card({
		flush: true,
		get children() {
			return [
				ListRow({
					leadingIcon: "user",
					label: "Applicant",
					get value() {
						return d.fisher.name || "—";
					}
				}),
				Divider({}),
				ListRow({
					leadingIcon: "shield",
					label: "Traditional Inhabitant",
					get value() {
						return criterion();
					}
				}),
				Divider({}),
				ListRow({
					leadingIcon: "document",
					label: "Licence",
					get value() {
						return licence();
					}
				}),
				Divider({}),
				ListRow({
					leadingIcon: "users",
					label: "Confirmed by",
					get value() {
						return `${d.ti.councillor?.name ?? "—"} · ${d.ti.mayor?.name ?? "—"}`;
					}
				})
			];
		}
	})), escape(Toggle({
		get checked() {
			return d.ti.applicantDeclarationAccepted;
		},
		onChange: (v) => props.update((dd) => {
			dd.ti.applicantDeclarationAccepted = v;
		}),
		get label() {
			return `I declare ${d.mode === "delegate" ? "this information is" : "everything here is"} true and correct`;
		},
		description: "Giving false or misleading information is an offence."
	})));
}
function TheCrossing(props) {
	var _v$93, _v$94, _v$95, _v$96;
	const submit = useMutation(api.licensing.applications.submit);
	const upsertTi = useMutation(api.licensing.attestation.upsertTiVerification);
	const attachEvidence = useMutation(api.licensing.attestation.attachEvidence);
	const submitTi = useMutation(api.licensing.attestation.submitTiVerification);
	const [state, setState] = createSignal(props.draft.status === "lodged" ? "arrived" : "ready");
	const [error, setError] = createSignal("");
	const lodge = async () => {
		if (!props.draft.licenceTypeCode) {
			setError("Choose a licence first.");
			setState("blocked");
			return;
		}
		setState("lodging");
		setError("");
		try {
			let tiVerificationId;
			const ti = props.draft.ti;
			if (ti.criterion) {
				const applicantPartyId = props.draft.mode === "delegate" ? props.draft.fisher.partyId : void 0;
				tiVerificationId = await upsertTi.mutate({
					applicantPartyId,
					criterion: ti.criterion,
					clientId: props.draft.clientId,
					isDescendant: ti.isDescendant,
					councillor: ti.councillor,
					mayor: ti.mayor,
					applicantDeclarationAccepted: ti.applicantDeclarationAccepted
				});
				if (ti.attestationStorageId) await attachEvidence.mutate({
					verificationId: tiVerificationId,
					field: "attestationStorageId",
					storageId: ti.attestationStorageId
				});
				if (ti.homeAffairsLetterStorageId) await attachEvidence.mutate({
					verificationId: tiVerificationId,
					field: "homeAffairsLetterStorageId",
					storageId: ti.homeAffairsLetterStorageId
				});
				await submitTi.mutate({ verificationId: tiVerificationId });
			}
			const id = await submit.mutate({
				clientId: props.draft.clientId,
				applicantPartyId: props.draft.mode === "delegate" ? props.draft.fisher.partyId : void 0,
				licenceTypeCode: props.draft.licenceTypeCode,
				sector: "traditional_inhabitant",
				requestedFisheryIds: props.draft.requestedFisheryIds,
				tiVerificationId,
				lodgedByRelationship: props.draft.delegate?.relationship,
				channel: "assisted",
				submit: true
			});
			props.update((d) => {
				d.status = "lodged";
				d.lodgedApplicationId = id;
			});
			setState("arrived");
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not lodge yet.");
			setState("blocked");
		}
	};
	return ssr(_tmpl$32, ssrHydrationKey(), escape(Switch({ get children() {
		return [
			Match({
				get when() {
					return state() === "arrived";
				},
				get children() {
					return [
						(_v$93 = ssrHydrationKey(), ssr(_tmpl$29, _v$93)),
						(_v$94 = ssrHydrationKey(), ssr(_tmpl$30, _v$94)),
						(_v$95 = ssrHydrationKey(), _v$96 = () => escape(props.draft.fisher.name || "Your"), ssr(_tmpl$31, _v$95, _v$96)),
						Callout({
							tone: "success",
							"class": "mt-6 w-full max-w-sm",
							title: "Lodged",
							children: "AFMA is now reviewing the application."
						})
					];
				}
			}),
			Match({
				get when() {
					return state() === "blocked";
				},
				get children() {
					return [Callout({
						tone: "warning",
						"class": "w-full max-w-sm",
						title: "Not yet",
						get children() {
							return error();
						}
					}), Button({
						"class": "mt-5",
						variant: "secondary",
						iconLeft: "arrow-left",
						onClick: () => setState("ready"),
						children: "Go back"
					})];
				}
			}),
			Match({
				when: true,
				get children() {
					return [Leg({
						eyebrow: "The crossing",
						title: "Ready to make the crossing?",
						children: "This lodges the application with AFMA. You can't change it after."
					}), Button({
						block: true,
						size: "lg",
						iconRight: "send",
						get loading() {
							return state() === "lodging";
						},
						onClick: lodge,
						"class": "mt-2 w-full max-w-sm",
						children: "Lodge the application"
					})];
				}
			})
		];
	} })));
}
//#endregion
//#region src/routes/_authed/apply.tsx?tsr-split=component
var _tmpl$ = ["<div", " class=\"grid min-h-[100dvh] place-items-center bg-[var(--c-bg)] font-data text-[0.75rem] uppercase tracking-wide text-[var(--c-faint)]\">Preparing your voyage…</div>"];
function ApplyRoute() {
	const [clientId, setClientId] = createSignal(null);
	onSettled(() => {
		const existing = draftsCollection.toArray.filter((d) => d.status !== "lodged").sort((a, b) => b.updatedAt - a.updatedAt)[0];
		setClientId(existing ? existing.clientId : createDraft({ mode: "self" }));
	});
	return Show({
		get when() {
			return clientId();
		},
		get fallback() {
			return ssr(_tmpl$, ssrHydrationKey());
		},
		children: (id) => Crossing({ get clientId() {
			return id();
		} })
	});
}
//#endregion
export { ApplyRoute as component };
